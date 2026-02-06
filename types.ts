// types.ts
// Dependency-free types used across the app.
// Replaces firebase/firestore Timestamp import to avoid requiring firebase package.

export type Timestamp = Date | string | number;

export type TradeType =
  | 'Plumber'
  | 'Electrician'
  | 'HVAC'
  | 'Drywaller'
  | 'Roofer';

export type ClientType = 'Residential' | 'Commercial' | 'Both';

export type ViewType =
  | 'home'
  | 'map'
  | 'admin-dashboard'
  | 'about'
  | 'methodology'
  | 'contact'
  | 'terms'
  | 'privacy'
  | 'verify'
  | 'become-partner'
  | 'intelligence'
  | string;

/* Professional type used by constants and components.
   Keep it minimal for preview builds; extend later from backup if needed. */
export type Professional = {
  id: string;
  name?: string;
  trade?: TradeType;
  city?: string;
  verified?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
