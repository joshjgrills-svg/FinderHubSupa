// lib/maintenance-worker.ts
export class MaintenanceWorker {
  public db = {
    async getTotalProfessionalsCount(): Promise<number> {
      return 0;
    }
  };

  constructor() {}

  start(): void {}
  stop(): void {}
}
