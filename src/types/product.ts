export type Neckline = 'high' | 'crew' | 'scoop' | 'v-neck' | 'plunge';
export type SleeveLength = 'wrist' | '3/4' | 'elbow' | 'short' | 'sleeveless';
export type Hemline = 'floor' | 'ankle' | 'midi' | 'knee' | 'mini';
export type GarmentFit = 'loose' | 'relaxed' | 'fitted' | 'bodycon';
export type Occasion = 'gymwear' | 'graduation' | 'wedding' | 'workwear' | 'school' | 'casual' | 'eid' | 'formal';

export type OccasionType = 'Everyday Wear' | 'Gymwear' | 'Sleepwear' | 'Undergarments' | 'Going Out';
export type SleeveType = 'long' | 'short' | 'sleeveless';
export type NecklineType = 'high_neck' | 'crewneck' | 'v_neck' | 'open_collar' | 'strapless';

export interface TaggedProduct {
  id: string | number;
  title: string;
  price: number;
  store: string;
  image: string;
  occasion: OccasionType;
  sleeve: SleeveType;
  neckline: NecklineType;
  is_cropped: boolean;
  has_slits: boolean;
  has_cutouts: boolean;
  is_sheer: boolean;
  modesty_score: number;
}

export interface BoundingBox {
  id: string;
  label: string;
  type: 'pass' | 'fail' | 'warning';
  top: number;
  left: number;
  width: number;
  height: number;
  note: string;
}

export interface ModestyAudit {
  neckline: Neckline;
  sleeveLength: SleeveLength;
  hemline: Hemline;
  hasSlit: boolean;
  isOpenBack: boolean;
  isSheer: boolean;
  fit: GarmentFit;
  modestyScore: number;
  detectedIssues?: string[];
  auditSummary?: string;
  retailerDescriptionText?: string;
  visionConfidence?: number;
  scanTimestamp?: string;
  boundingBoxes?: BoundingBox[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string | number;
  originalPrice?: string | number;
  originalUrl: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  category: string;
  color?: string;
  tags: string[];
  occasion?: OccasionType | Occasion | string;
  sleeve?: SleeveType;
  neckline?: NecklineType | Neckline;
  is_cropped?: boolean;
  has_slits?: boolean;
  has_cutouts?: boolean;
  is_sheer?: boolean;
  modesty_score?: number;
  aspectRatio?: 'tall' | 'portrait' | 'square' | 'wide';
  modestyAudit: ModestyAudit;
}

export interface ModestyProfile {
  name: string;
  necklines: Neckline[];
  sleeveLengths: SleeveLength[];
  hemlines: Hemline[];
  fits: GarmentFit[];
  noSlits: boolean;
  noOpenBack: boolean;
  isOpaque: boolean;
  selectedRetailers: string[];
  selectedOccasions: string[];
  isProfileComplete: boolean;
}

export interface ModestyFilterState {
  necklines: Neckline[];
  sleeveLengths: SleeveLength[];
  hemlines: Hemline[];
  fits: GarmentFit[];
  noSlits: boolean;
  noOpenBack: boolean;
  isOpaque: boolean;
  minModestyScore?: number;
  maxPrice?: number;
  searchQuery: string;
  selectedCategory: string;
  selectedRetailer: string;
  selectedOccasion: string;
  sortBy?: 'relevance' | 'price_low' | 'price_high' | 'modesty_score';
  demoMode?: 'ai_search' | 'broken_keyword' | 'strict_rule';
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  profile: ModestyProfile;
}

export interface CalculatedMatch {
  product: Product;
  matchPercentage: number;
  passedFilters: boolean;
  matchReasons: string[];
  warnings: string[];
}
