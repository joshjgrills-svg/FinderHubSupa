// components/pages/CategoryPage.tsx
import React from 'react';
import { TradeType } from '../../types';

export type CategoryPageProps = {
  trade?: TradeType;
};

export const CategoryPage: React.FC<CategoryPageProps> = ({ trade }) => {
  return (
    <section style={{ padding: 24 }}>
      <h2>Category: {trade ?? '—'}</h2>
      <p>Preview stub for category results.</p>
    </section>
  );
};
