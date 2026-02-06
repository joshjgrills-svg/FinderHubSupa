// components/pages/HomePage.tsx
import React from 'react';
import { TradeType } from '../../types';

export type HomePageProps = {
  onSelectTrade?: (t: TradeType) => void;
  dbCount?: number;
  onNavigate?: (v: string) => void;
};

export const HomePage: React.FC<HomePageProps> = ({ onSelectTrade, dbCount, onNavigate }) => {
  return (
    <section style={{ padding: 24 }}>
      <h2>Home</h2>
      <p>Audited records: {dbCount?.toLocaleString() ?? '0'}</p>
      <button onClick={() => onSelectTrade?.('Plumber')}>Select Plumber</button>
      <button onClick={() => onNavigate?.('map')}>Open Map</button>
    </section>
  );
};
