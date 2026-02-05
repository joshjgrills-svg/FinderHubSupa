// app/test-supabase/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestSupabasePage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    async function runTest() {
      setStatus('loading');
      try {
        const { data, error, status: st } = await supabase
          .from('providers')
          .select('id')
          .limit(1);

        if (error) {
          setStatus('error');
          setMessage(`Query error: ${error.message} (status ${st})`);
          return;
        }

        setStatus('success');
        setMessage(`Query success: ${Array.isArray(data) ? `${data.length} rows` : JSON.stringify(data)}`);
      } catch (err: any) {
        setStatus('error');
        setMessage(`Unexpected error: ${err?.message || String(err)}`);
      }
    }

    runTest();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Supabase Connection Test</h1>
      <p>Status: <strong>{status}</strong></p>
      <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 8 }}>{message}</pre>
      <p style={{ marginTop: 12, color: '#666' }}>
        If you see "Query success" or a Supabase error message, the client connected to Supabase.
      </p>
    </main>
  );
}
