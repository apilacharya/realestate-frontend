import { useQuery } from '@tanstack/react-query';
import { getListings, getListing } from '../lib/api';
import type { ListingsQueryParams, ListingsResponse, SingleListingResponse } from '../types/listing';

export const useListings = (params: ListingsQueryParams) => {
  return useQuery<ListingsResponse, Error>({
    queryKey: ['listings', params],
    queryFn: () => getListings(params),
  });
};

export const useListing = (id: number | string) => {
  return useQuery<SingleListingResponse, Error>({
    queryKey: ['listing', id],
    queryFn: () => getListing(id),
    enabled: !!id,
  });
};

