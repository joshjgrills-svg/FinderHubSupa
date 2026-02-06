// app/test-supabase/page.tsx
import { supabase } from '@/lib/supabaseClient';

export default async function TestSupabasePage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

  let status = 'OK';
  let message = 'Supabase env vars present.';

  if (!url || !key) {
    status = 'MISSING';
    message = 'NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.';
  } else {
    try {
      // Lightweight check: attempt a GET to the Supabase project root with the anon key.
      // This runs at request time on the server and is non-blocking for build.
      const res = await fetch(url, { method: 'GET', headers: { apikey: key } });
      if (!res.ok) {
        status = `UNREACHABLE (${res.status})`;
        message = `Supabase responded with status ${res.status}.`;
      } else {
        message = `Supabase reachable at ${url}`;
      }
    } catch (err: any) {
      status = 'ERROR';
      message = String(err?.message ?? err);
    }
  }

  return (
    <main>
      <h1>Supabase Test</h1>
      <p><strong>Status:</strong> {status}</p>
      <pre style={{ background: '#f3f4f6', padding: 12 }}>{message}</pre>
      <p>Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in Vercel env vars.</p>
    </main>
  );
}
