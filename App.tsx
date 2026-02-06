// App.tsx
import React from 'react';

export default function App(): JSX.Element {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', padding: 24 }}>
      <header>
        <h1>FinderHub — Preview (reset-to-clean)</h1>
      </header>

      <main>
        <p>This is a minimal application shell used to unblock the build while we restore or replace legacy components.</p>
        <p>
          Visit <a href="/test-supabase">/test-supabase</a> to verify Supabase connectivity (if env vars are configured).
        </p>
      </main>

      <footer style={{ marginTop: 32, borderTop: '1px solid #eee', paddingTop: 12 }}>
        <small>Preview build — minimal App.tsx</small>
      </footer>
    </div>
  );
}
