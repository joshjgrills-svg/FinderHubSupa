// components/pages/GhostPage.tsx
import React from 'react';

export type GhostPageProps = {
  id?: string;
};

export const GhostPage: React.FC<GhostPageProps> = ({ id }) => {
  return (
    <section style={{ padding: 24 }}>
      <h2>Unknown Page</h2>
      <p>Preview stub for unknown view: {id}</p>
    </section>
  );
};
