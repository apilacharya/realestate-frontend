import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword !== (filters.keyword || '')) {
        setFilter('page', 1);
        setFilter('keyword', keyword || undefined);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [keyword, setFilter, filters.keyword]);

  useEffect(() => {
    if (sortBy !== (filters.sort_by || 'newest')) {
      setFilter('page', 1);
      setFilter('sort_by', sortBy as Filters['sort_by']);
    }
  }, [sortBy, setFilter, filters.sort_by]);

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
          <Icon icon="mage:search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors w-5 h-5 pointer-events-none" />
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
              {sortBy === 'newest' && <Icon icon="mage:clock" className="w-5 h-5" />}
              {sortBy === 'price_asc' && <Icon icon="mage:sort-ascending" className="w-5 h-5" />}
              {sortBy === 'price_desc' && <Icon icon="mage:sort-descending" className="w-5 h-5" />}
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
              <Icon icon="mage:filter" className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            {activeFilterCount > 0 && (
              <button 
                onClick={resetFilters} 
                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border-2 border-transparent hover:border-red-100"
                title="Clear Filters"
              >
                <Icon icon="mage:multiply" className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
