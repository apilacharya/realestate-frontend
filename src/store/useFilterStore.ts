import { create } from 'zustand';

export interface Filters {
  suburb?: string;
  price_min?: number;
  price_max?: number;
  beds?: number;
  baths?: number;
  property_type?: 'house' | 'apartment' | 'townhouse' | 'land';
  keyword?: string;
  status?: 'available' | 'under_offer' | 'sold';
  sort_by: 'price_asc' | 'price_desc' | 'newest';
  page: number;
}

interface FilterState {
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  setFilters: (newFilters: Partial<Filters>) => void;
  resetFilters: () => void;
}

const initialFilters: Filters = {
  sort_by: 'newest',
  page: 1,
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: initialFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));
