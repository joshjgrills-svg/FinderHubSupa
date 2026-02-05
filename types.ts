import { Timestamp } from 'firebase/firestore';

export type TradeType = 'Plumber' | 'Electrician' | 'HVAC' | 'Drywaller' | 'Roofer';
export type ClientType = 'Residential' | 'Commercial' | 'Both';
export type ViewType = 
  | 'home' 
  | 'about' 
  | 'methodology' 
  | 'contact' 
  | 'terms' 
  | 'privacy' 
  | 'verify' 
  | 'admin-dashboard' 
  | 'map' 
  | 'intelligence'
  | 'become-partner'
  | string; // Support for dynamic/ghost routes

export interface Testimonial {
  author: string;
  text: string;
  rating: number;
}

export interface Professional {
  id: string;
  name: string;
  trade: TradeType;
  city: string;
  address: string;
  neighborhood: string;
  phone: string;
  website: string; 
  website_url?: string | null;
  sourceUrl: string;

  rating: number;
  reviewCount: number;

  yelpRating?: number | string | null;
  trustScore?: number | string | null;
  trustpilotRating?: number | string | null;
  trustpilotReviewCount?: number | null;
  bbbRating?: string | null;

  services: string[];
  isEmergency: boolean;
  description: string;
  logoUrl?: string;
  verified: boolean;
  latitude: number;
  longitude: number;
  email?: string;
  yearsInBusiness?: number;
  testimonials?: Testimonial[];
  clientType?: ClientType;
  
  // BUSINESS PORTAL FIELDS
  isClaimed: boolean;
  claimedByEmail?: string | null;
  membershipLevel: 'basic' | 'partner';

  lastScraped?: Timestamp | any; 
  lastVerified: string;
  lastHealed?: Timestamp | any;
  status: 'active' | 'inactive' | 'pending';
  
  // QUANTUM AUDIT LOGS
  lastScrapeLog?: string;
  lastScrapeUrl?: string;
  scrapeStatus?: 'success' | 'partial' | 'failed';
}

export interface SearchGrid {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  trade: TradeType;
  city: string;
  providerCount?: number;
  lastScanned?: string;
}

export interface TerminalLog {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  imageData?: string;
}

export interface ScanPoint {
  lat: number;
  lng: number;
  isDense: boolean;
}

export interface RegisteredPage {
  id: ViewType;
  title: string;
  path: string;
  source: string;
  createdAt: string;
  isGhost?: boolean;
}