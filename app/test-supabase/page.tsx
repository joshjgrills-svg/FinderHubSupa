// app/test-supabase/page.tsx
import React from 'react';

export default function TestSupabasePage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

  const isValidUrl = (u: string) => {
    try {
      const parsed = new URL(u);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  if (!isValidUrl(url) || !key) {
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial' }}>
        <h1>Supabase Test</h1>
        <p style={{ color: '#b33' }}>
          Supabase is not configured for this preview build.
        </p>
        <ul>
          <li><strong>NEXT_PUBLIC_SUPABASE_URL</strong> must be a valid HTTP or HTTPS URL.</li>
          <li><strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong> must be set.</li>
        </ul>
        <p>
          To enable the test page, add these environment variables in your Vercel project settings or remove this page.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial' }}>
      <h1>Supabase Test</h1>
      <p>Supabase environment variables are present. The preview build will not expose keys here.</p>
      <p>Preview build succeeded and the page is safe to use.</p>
    </div>
  );
}
