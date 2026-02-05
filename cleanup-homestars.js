import admin from "firebase-admin";

/**
 * FINDERHUB DATABASE CLEANUP SCRIPT
 * Task: Remove 'homestarsRating' field from all professional records.
 * Execution: node cleanup-homestars.js
 * 
 * Note: Ensure GOOGLE_APPLICATION_CREDENTIALS environment variable is set
 * or initialize with a service account JSON file.
 */

if (admin.apps.length === 0) {
  // Attempt to initialize with default credentials (local environment or cloud)
  admin.initializeApp();
}

const db = admin.firestore();

async function cleanupHomestars() {
  console.log("\n--- FinderHub Database Cleanup ---");
  console.log("🚀 Initializing scan of 'professionals' collection...");
  
  try {
    const collectionRef = db.collection('professionals');
    const snapshot = await collectionRef.get();
    
    if (snapshot.empty) {
      console.log("❌ No records found in the 'professionals' collection.");
      return;
    }

    const totalRecords = snapshot.size;
    console.log(`🔍 Found ${totalRecords} total records.`);
    console.log(`🧹 Processing field removal for 'homestarsRating'...\n`);

    let totalCleaned = 0;
    let batch = db.batch();
    let countInBatch = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      
      // We only perform the update if the field actually exists to maintain accuracy
      if (Object.prototype.hasOwnProperty.call(data, 'homestarsRating')) {
        batch.update(doc.ref, {
          homestarsRating: admin.firestore.FieldValue.delete()
        });
        
        countInBatch++;
        totalCleaned++;

        // Firestore batch limit is 500 operations
        if (countInBatch === 500) {
          await batch.commit();
          console.log(`✅ Committed batch. [${totalCleaned}/${totalRecords} cleaned]`);
          batch = db.batch();
          countInBatch = 0;
        }
      }
    }

    // Commit any remaining operations in the final batch
    if (countInBatch > 0) {
      await batch.commit();
    }

    console.log("\n----------------------------------");
    console.log("🎉 Cleanup Operation Complete");
    console.log(`📊 Total Records Scanned: ${totalRecords}`);
    console.log(`🧹 Total Records Cleaned: ${totalCleaned}`);
    console.log(`⚠️ Verification: Check if ${totalCleaned} aligns with your expected count.`);
    console.log("----------------------------------\n");

  } catch (error) {
    console.error("\n❌ CRITICAL ERROR during cleanup:");
    console.error(error);
    process.exit(1);
  }
}

cleanupHomestars().then(() => process.exit(0));
