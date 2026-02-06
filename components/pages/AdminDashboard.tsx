// components/pages/AdminDashboard.tsx
import React from 'react';
import { MaintenanceWorker } from '../../lib/maintenance-worker';

export type AdminDashboardProps = {
  maintenanceWorker?: MaintenanceWorker;
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ maintenanceWorker }) => {
  return (
    <section style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <p>Preview stub. Maintenance worker available: {maintenanceWorker ? 'yes' : 'no'}</p>
    </section>
  );
};
