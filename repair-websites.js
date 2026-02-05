
/**
 * FINDERHUB MAINTENANCE: Website Healing Script
 * 
 * Usage:
 * 1. Set environment variable: export API_KEY='your_google_maps_key'
 * 2. Ensure firebase-admin is authenticated (service account or default)
 * 3. Run: node repair-websites.js
 */

import admin from "firebase-admin";
import fetch from "node-fetch";

// Use environment variables for safety
const GOOGLE_API_KEY = process.env.API_KEY;

if (!GOOGLE_API_KEY) {
  console.error("❌ ERROR: Missing API_KEY environment variable.");
  process.exit(1);
}

// Initialize Firebase Admin
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();

async function healWebsites() {
  console.log("\n--- FinderHub: Website Healing Sequence Engaged ---");
  console.log("🔍 Scanning professionals for invalid website placeholders ('#')...\n");

  try {
    const prosRef = db.collection('professionals');
    const snapshot = await prosRef.where('website', '==', '#').get();

    if (snapshot.empty) {
      console.log("✅ No records found with '#' placeholder. Database is healthy.");
      return;
    }

    console.log(`📡 Found ${snapshot.size} records requiring repair.\n`);

    let healedCount = 0;
    let failedCount = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const { name, city, id } = data;

      console.log(`🛠️  Processing: [${name}] in ${city}...`);

      try {
        // STEP 1: Find the Place ID
        const searchUrl = "https://places.googleapis.com/v1/places:searchText";
        const searchRes = await fetch(searchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_API_KEY,
            'X-Goog-FieldMask': 'places.id,places.displayName'
          },
          body: JSON.stringify({
            textQuery: `${name} in ${city}, Ontario`,
            maxResultCount: 1
          })
        });

        const searchData = await searchRes.json();
        const place = searchData.places?.[0];

        if (!place) {
          console.log(`   ⚠️ No match found for "${name}" via Text Search.`);
          failedCount++;
          continue;
        }

        // STEP 2: Get verified website from Place Details
        const detailUrl = `https://places.googleapis.com/v1/places/${place.id}`;
        const detailRes = await fetch(detailUrl, {
          method: 'GET',
          headers: {
            'X-Goog-Api-Key': GOOGLE_API_KEY,
            'X-Goog-FieldMask': 'websiteUri'
          }
        });

        const detailData = await detailRes.json();
        const verifiedWebsite = detailData.websiteUri || "None";

        // STEP 3: Update Firestore
        await prosRef.doc(doc.id).update({
          website: verifiedWebsite,
          website_url: verifiedWebsite === "None" ? null : verifiedWebsite,
          lastHealed: admin.firestore.FieldValue.serverTimestamp()
        });

        if (verifiedWebsite !== "None") {
          console.log(`   ✨ Healed: ${verifiedWebsite}`);
        } else {
          console.log(`   ℹ️  No website registered. Updated to 'None'.`);
        }
        
        healedCount++;

        // Rate limiting: sleep 200ms between calls to stay safe
        await new Promise(r => setTimeout(r, 200));

      } catch (err) {
        console.error(`   ❌ Failed to repair ${name}: ${err.message}`);
        failedCount++;
      }
    }

    console.log("\n----------------------------------");
    console.log("🎉 Healing Operation Complete");
    console.log(`📊 Successfully Repaired: ${healedCount}`);
    console.log(`📊 Failed/Skipped: ${failedCount}`);
    console.log("----------------------------------\n");

  } catch (error) {
    console.error("❌ CRITICAL ERROR during maintenance loop:");
    console.error(error);
  }
}

healWebsites().then(() => process.exit(0));
