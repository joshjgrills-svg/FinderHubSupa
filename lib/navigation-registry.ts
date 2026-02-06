// lib/navigation-registry.ts
export const navEngine = {
  registerDynamicPage: (v: string, source?: string) => {
    // lightweight stub for analytics/navigation registry
    // no-op in preview
    return { page: v, source: source ?? 'unknown' };
  }
};
