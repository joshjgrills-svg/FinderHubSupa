// app/page.tsx
export default function HomePage() {
  return (
    <main style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>FinderHub — Deployment Test</h1>
      <p>This is the root page. If you see this, the site no longer returns 404 for <code>/</code>.</p>
      <p>
        Test the Supabase page at <a href="/test-supabase">/test-supabase</a>.
      </p>
    </main>
  );
}
