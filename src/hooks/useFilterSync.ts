import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFilterStore } from '../store/useFilterStore';
import type { Filters } from '../store/useFilterStore';

export const useFilterSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, setFilters } = useFilterStore();
  const isInitialMount = useRef(true);

  // Sync URL -> Store (on mount and URL travel)
  useEffect(() => {
    if (isInitialMount.current) {
      const params: Partial<Filters> = {};
      
      const suburb = searchParams.get('suburb');
      if (suburb) params.suburb = suburb;

      const price_min = searchParams.get('price_min');
      if (price_min) params.price_min = Number(price_min);

      const price_max = searchParams.get('price_max');
      if (price_max) params.price_max = Number(price_max);

      const beds = searchParams.get('beds');
      if (beds) params.beds = Number(beds);

      const baths = searchParams.get('baths');
      if (baths) params.baths = Number(baths);

      const property_type = searchParams.get('property_type');
      if (property_type) params.property_type = property_type as Filters['property_type'];

      const keyword = searchParams.get('keyword');
      if (keyword) params.keyword = keyword;

      const status = searchParams.get('status');
      if (status) params.status = status as Filters['status'];

      const sort_by = searchParams.get('sort_by');
      if (sort_by) params.sort_by = sort_by as Filters['sort_by'];

      if (Object.keys(params).length > 0) {
        setFilters(params);
      }
      isInitialMount.current = false;
    }
  }, [searchParams, setFilters]);

  // Sync Store -> URL (on filter changes)
  useEffect(() => {
    if (!isInitialMount.current) {
      const newParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          newParams.set(key, String(value));
        }
      });

      // Avoid redundant navigation if params haven't changed
      if (newParams.toString() !== searchParams.toString()) {
        setSearchParams(newParams, { replace: true });
      }
    }
  }, [filters, searchParams, setSearchParams]);
};
