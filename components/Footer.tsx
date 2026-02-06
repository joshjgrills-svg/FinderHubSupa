// components/Footer.tsx
import React from 'react';

export type FooterProps = {
  onNavigate?: (v: string) => void;
};

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer style={{ padding: 16, textAlign: 'center', borderTop: '1px solid #eaeaea' }}>
      <small style={{ color: '#666' }}>
        © {new Date().getFullYear()} FinderHub — Preview build
      </small>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => onNavigate?.('home')} style={{ marginRight: 8 }}>Home</button>
        <button onClick={() => onNavigate?.('contact')}>Contact</button>
      </div>
    </footer>
  );
};
