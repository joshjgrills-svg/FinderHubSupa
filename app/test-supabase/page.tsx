// app/test-supabase/page.tsx
import React from 'react';
import { supabase } from '../../src/lib/supabaseClient';

export default async function TestSupabasePage() {
  // Safe runtime check: do not throw if env not set
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Supabase Test</h1>
        <p><strong>Status:</strong> <em>No env configured</em></p>
        <p><strong>Message:</strong> NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing</p>
      </main>
    );
  }

  // Try a lightweight call; keep it safe and fast
  try {
    const { data, error } = await supabase.from('profiles').select('id').limit(1);
    if (error) {
      return (
        <main style={{ padding: 24 }}>
          <h1>Supabase Test</h1>
          <p><strong>Status:</strong> Error</p>
          <p><strong>Message:</strong> {error.message}</p>
        </main>
      );
    }
    return (
      <main style={{ padding: 24 }}>
        <h1>Supabase Test</h1>
        <p><strong>Status:</strong> OK</p>
        <p><strong>Message:</strong> Able to query Supabase; sample rows: {Array.isArray(data) ? data.length : 0}</p>
      </main>
    );
  } catch (err: any) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Supabase Test</h1>
        <p><strong>Status:</strong> Exception</p>
        <p><strong>Message:</strong> {String(err?.message ?? err)}</p>
      </main>
    );
  }
}
