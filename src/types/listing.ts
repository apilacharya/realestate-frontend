export type PropertyType = 'house' | 'apartment' | 'townhouse' | 'land';
export type PropertyStatus = 'available' | 'under_offer' | 'sold';

export interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string | null;
}

export interface Property {
  id: number;
  title: string;
  description: string | null;
  price: string | number;
  bedrooms: number;
  bathrooms: number;
  propertyType: PropertyType;
  suburb: string;
  state: string;
  address: string;
  imageUrl: string | null;
  status: PropertyStatus;
  internalNotes?: string | null;
  isFeatured: boolean;
  agentId: number | null;
  agent?: Agent;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface ListingsResponse {
  data: Property[];
  meta: PaginationMeta;
}

export interface SingleListingResponse {
  data: Property;
}

export interface ListingsQueryParams {
  suburb?: string;
  price_min?: number;
  price_max?: number;
  beds?: number;
  baths?: number;
  property_type?: PropertyType;
  keyword?: string;
  status?: PropertyStatus;
  page?: number;
  limit?: number;
  sort_by?: 'price_asc' | 'price_desc' | 'newest';
}
