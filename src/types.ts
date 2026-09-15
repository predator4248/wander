export type BudgetLevel = 'shoestring' | 'budget' | 'midrange' | 'premium' | 'luxury';

export type ExperienceCategory =
  | 'sightseeing'
  | 'food'
  | 'culture'
  | 'adventure'
  | 'shopping'
  | 'nature'
  | 'wellness'
  | 'nightlife'
  | 'transport';

export type TransportMode =
  | 'flight'
  | 'train'
  | 'bus'
  | 'car'
  | 'taxi'
  | 'ferry'
  | 'walk'
  | 'none';

export type StayType =
  | 'hostel'
  | 'budget'
  | 'midrange'
  | 'heritage'
  | 'boutique'
  | 'luxury'
  | 'homestay'
  | 'resort'
  | 'camp';

export interface Experience {
  time: string;
  title: string;
  description: string;
  category: ExperienceCategory;
  location: string;
  lat: number | null;
  lng: number | null;
  durationMinutes: number;
  costINR: number;
  tip?: string | null;
}

export interface DayPlan {
  day: number;
  date?: string;
  title: string;
  summary: string;
  experiences: Experience[];
}

export interface StayInfo {
  type: StayType;
  name: string;
  approxCostPerNightINR: number;
  whyGood: string;
}

export interface TransportLeg {
  mode: TransportMode;
  from: string;
  durationHours: number;
  distanceKm: number;
  approxCostINR: number;
  notes: string;
  operator?: string;
  fromCode?: string;
  toCode?: string;
}

export interface CityPlan {
  name: string;
  state: string;
  arrivalDate?: string;
  departureDate?: string;
  nights: number;
  lat: number;
  lng: number;
  blurb: string;
  transportFromPrev: TransportLeg;
  stay: StayInfo;
  isBasecamp?: boolean;
  basecampFor?: string;
  days: DayPlan[];
}

export interface TravelersProfile {
  adults: number;
  children: number;
  style: string;
}

export interface Itinerary {
  title: string;
  tagline: string;
  totalDays: number;
  travelers: TravelersProfile;
  budgetLevel: BudgetLevel;
  bestSeasonNote: string;
  cities: CityPlan[];
  returnLeg: TransportLeg;
  totalEstimatedCostINR: number;
  packingTips: string[];
  cautions: string[];
}

export interface NonIndiaMatch {
  place: string;
  alternatives: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp?: number;
}
