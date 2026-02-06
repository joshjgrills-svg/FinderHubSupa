// lib/maintenance-worker.ts
// Minimal stub so imports resolve during build.
// Safe default implementation used until real DB logic is added.

export class MaintenanceWorker {
  public db = {
    async getTotalProfessionalsCount(): Promise<number> {
      // Return 0 as a safe default during build/runtime until real DB is wired.
      return 0;
    }
  };

  constructor() {
    // no-op
  }

  start(): void {
    // no-op placeholder
  }

  stop(): void {
    // no-op placeholder
  }
}
