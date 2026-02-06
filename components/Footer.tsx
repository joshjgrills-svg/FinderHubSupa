// components/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ padding: 16, textAlign: 'center', borderTop: '1px solid #eaeaea' }}>
      <small style={{ color: '#666' }}>
        © {new Date().getFullYear()} FinderHub — Preview build
      </small>
    </footer>
  );
};
