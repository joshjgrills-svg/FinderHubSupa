/* app/globals.css */

/* Minimal global styles so Next.js build can resolve the import */
:root {
  --bg: #ffffff;
  --text: #0f172a;
  --muted: #6b7280;
}

html, body, #__next {
  height: 100%;
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a { color: inherit; text-decoration: underline; }
pre { white-space: pre-wrap; word-break: break-word; }
