// app/page.tsx
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>FinderHub Preview</h1>
      <p>Preview environment for reset-to-clean branch.</p>
      <p><Link href="/test-supabase">Open /test-supabase</Link></p>
    </main>
  );
}
