import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useFilterStore } from '../store/useFilterStore';
import type { Filters } from '../store/useFilterStore';

const numberOrUndefined = z.preprocess(
  (val) => (val === '' ? undefined : Number(val)),
  z.number().min(0).optional()
);

const filterSchema = z.object({
  suburb: z.string().optional(),
  price_min: numberOrUndefined,
  price_max: numberOrUndefined,
  beds: numberOrUndefined,
  baths: numberOrUndefined,
  property_type: z.enum(['house', 'apartment', 'townhouse', 'land']).optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  const { filters, setFilters, resetFilters } = useFilterStore();
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema) as any,
    defaultValues: filters as any, // Cast for matching store defaults
  });

  const currentType = watch('property_type');

  // Sync with store when drawer opens
  useEffect(() => {
    if (isOpen) {
      reset(filters as any);
    }
  }, [isOpen, filters, reset]);

  const onApply = (data: FilterFormData) => {
    // Explicitly cast to Filters to satisfy store type constraints
    setFilters(data as Partial<Filters>);
    toast.success('Filters applied successfully');
    onClose();
  };

  const onReset = () => {
    resetFilters();
    reset({});
    toast.info('Filters cleared');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Filters</h2>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onApply)} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Suburb */}
            <section>
              <label className="block text-sm font-bold text-gray-700 mb-3">Suburb</label>
              <select 
                {...register('suburb')}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 cursor-pointer appearance-none"
              >
                <option value="">Any Suburb</option>
                <option value="Northside">Northside</option>
                <option value="Southside">Southside</option>
                <option value="Heights">Heights</option>
              </select>
            </section>

            {/* Price Range */}
            <section>
              <label className="block text-sm font-bold text-gray-700 mb-3">Price Range</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Min Price</span>
                  <select 
                    {...register('price_min')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 font-bold text-gray-900 cursor-pointer appearance-none text-sm"
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
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Max Price</span>
                  <select 
                    {...register('price_max')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 font-bold text-gray-900 cursor-pointer appearance-none text-sm"
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
              </div>
            </section>

            {/* Type */}
            <section>
              <label className="block text-sm font-bold text-gray-700 mb-3">Property Type</label>
              <div className="grid grid-cols-2 gap-2">
                {['house', 'apartment', 'townhouse', 'land'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setValue('property_type', type as Filters['property_type'])}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                      currentType === type 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-blue-500 hover:bg-blue-50/20'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </section>

            {/* Rooms */}
            <div className="grid grid-cols-2 gap-6">
              <section>
                <label className="block text-sm font-bold text-gray-700 mb-3">Beds</label>
                <select 
                  {...register('beds')}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 font-bold text-gray-900 cursor-pointer"
                >
                  <option value="">Any</option>
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+ Beds</option>)}
                </select>
              </section>
              <section>
                <label className="block text-sm font-bold text-gray-700 mb-3">Baths</label>
                <select 
                  {...register('baths')}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 font-bold text-gray-900 cursor-pointer"
                >
                  <option value="">Any</option>
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+ Baths</option>)}
                </select>
              </section>
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-4">
            <button 
              type="button"
              onClick={onReset}
              className="flex-1 px-4 py-4 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
            <button 
              type="submit"
              className="flex-[1.5] px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterDrawer;
