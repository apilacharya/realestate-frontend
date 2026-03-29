import React, { useState, useCallback } from 'react';
import { useFilterStore } from '../store/useFilterStore';
import type { ListingsQueryParams } from '../types/listing';

const ListingFilters: React.FC = () => {
  const { filters, setFilter, resetFilters } = useFilterStore();
  
  const [localFilters, setLocalFilters] = useState<ListingsQueryParams>(filters);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: string | number | undefined = value;
    
    if (type === 'number' || name === 'beds' || name === 'baths' || name === 'price_min' || name === 'price_max') {
      finalValue = value === '' ? undefined : Number(value);
    } else if (value === '') {
      finalValue = undefined;
    }

    setLocalFilters(prev => ({ ...prev, [name]: finalValue as never }));
  }, []);

  const handleSearch = useCallback(() => {
    // Reset to first page on search
    setFilter('page', 1);

    // Bulk update store filters, excluding non-store parameters like page/limit
    const filterKeys: (keyof ListingsQueryParams)[] = [
      'suburb', 'price_min', 'price_max', 'beds', 'baths', 'property_type', 'keyword', 'sort_by'
    ];
    
    filterKeys.forEach(key => {
      const value = localFilters[key];
      if (value !== undefined || key === 'sort_by') {
        setFilter(key, value);
      }
    });
  }, [localFilters, setFilter]);

  const handleReset = useCallback(() => {
    resetFilters();
    setLocalFilters({});
  }, [resetFilters]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm mb-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Suburb</label>
          <select
            name="suburb"
            value={localFilters.suburb || ''}
            onChange={handleInputChange}
            className="form-input w-full cursor-pointer appearance-none"
          >
            <option value="">Any Suburb</option>
            <option value="Northside">Northside</option>
            <option value="Southside">Southside</option>
            <option value="Heights">Heights</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Min Price</label>
          <select
            name="price_min"
            value={localFilters.price_min?.toString() || ''}
            onChange={handleInputChange}
            className="form-input w-full cursor-pointer appearance-none"
          >
            <option value="">Any Min</option>
            <option value="0">$0</option>
            <option value="100000">$100k</option>
            <option value="250000">$250k</option>
            <option value="500000">$500k</option>
            <option value="750000">$750k</option>
            <option value="1000000">$1M</option>
            <option value="2000000">$2M</option>
            <option value="5000000">$5M</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Max Price</label>
          <select
            name="price_max"
            value={localFilters.price_max?.toString() || ''}
            onChange={handleInputChange}
            className="form-input w-full cursor-pointer appearance-none"
          >
            <option value="">Any Max</option>
            <option value="100000">$100k</option>
            <option value="250000">$250k</option>
            <option value="500000">$500k</option>
            <option value="750000">$750k</option>
            <option value="1000000">$1M</option>
            <option value="2000000">$2M</option>
            <option value="5000000">$5M</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Property Type</label>
          <select
            name="property_type"
            value={localFilters.property_type || ''}
            onChange={handleInputChange}
            className="form-input w-full"
          >
            <option value="">Any</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Beds</label>
          <select
            name="beds"
            value={localFilters.beds || ''}
            onChange={handleInputChange}
            className="form-input w-full"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Baths</label>
          <select
            name="baths"
            value={localFilters.baths || ''}
            onChange={handleInputChange}
            className="form-input w-full"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Keyword</label>
          <input
            type="text"
            name="keyword"
            value={localFilters.keyword || ''}
            onChange={handleInputChange}
            placeholder="Search title..."
            className="form-input w-full"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Sort By</label>
          <select
            name="sort_by"
            value={localFilters.sort_by || 'newest'}
            onChange={handleInputChange}
            className="form-input w-full"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={handleReset}
          className="text-sm text-gray-500 hover:text-gray-700 font-semibold transition-colors"
        >
          Reset Filters
        </button>
        <button
          onClick={handleSearch}
          className="btn-primary px-8 py-2 rounded-lg shadow-sm font-bold"
        >
          Search Properties
        </button>
      </div>
    </div>
  );
};

export default ListingFilters;

