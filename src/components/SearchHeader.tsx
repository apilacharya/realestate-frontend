import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFilterStore } from '../store/useFilterStore';
import type { Filters } from '../store/useFilterStore';

interface SearchHeaderProps {
  onOpenFilters: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onOpenFilters }) => {
  const { filters, setFilter, resetFilters } = useFilterStore();
  
  const { register, watch, setValue } = useForm({
    defaultValues: {
      keyword: filters.keyword || '',
      sort_by: filters.sort_by || 'newest'
    }
  });

  const keyword = watch('keyword');
  const sortBy = watch('sort_by');

  // Debounce search term update to the store
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter('keyword', keyword || undefined);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword, setFilter]);

  // Update sort immediately
  useEffect(() => {
    setFilter('sort_by', sortBy as Filters['sort_by']);
  }, [sortBy, setFilter]);

  // Sync with store if filters change externally (e.g. reset)
  useEffect(() => {
    setValue('keyword', filters.keyword || '');
    setValue('sort_by', filters.sort_by || 'newest');
  }, [filters.keyword, filters.sort_by, setValue]);

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'sort_by' || key === 'keyword' || key === 'page' || key === 'limit') return false;
    return value !== undefined && value !== null && value !== '';
  }).length;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-3 mb-8 sticky top-20 z-40">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 relative group">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            {...register('keyword')}
            type="text" 
            placeholder="Search by location, title or features..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none transition-all text-gray-900 font-bold"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Select */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-blue-500">
              {sortBy === 'newest' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {sortBy === 'price_asc' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              )}
              {sortBy === 'price_desc' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4 4m0 0l4-4m-4 4v12" />
                </svg>
              )}
            </div>
            <select 
              {...register('sort_by')}
              className="appearance-none pl-12 pr-10 py-3 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none transition-all text-sm font-bold text-gray-700 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenFilters}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeFilterCount > 0 
                  ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' 
                  : 'bg-white border-2 border-gray-100 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold shadow-sm">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {activeFilterCount > 0 && (
              <button 
                onClick={resetFilters} 
                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border-2 border-transparent hover:border-red-100"
                title="Clear Filters"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;

