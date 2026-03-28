import React, { useState, useCallback, useMemo } from 'react';
import Layout from '../components/Layout';
import SearchHeader from '../components/SearchHeader';
import FilterDrawer from '../components/FilterDrawer';
import ListingCard from '../components/ListingCard';
import Pagination from '../components/Pagination';
import ListingSkeleton from '../components/ListingSkeleton';
import { useListings } from '../hooks/useListings';
import { useFilterStore } from '../store/useFilterStore';
import { useFilterSync } from '../hooks/useFilterSync';

const SearchPage: React.FC = () => {
  // Sync filters with URL searching parameters
  useFilterSync();

  const { filters } = useFilterStore();
  const [page, setPage] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  const { data, isLoading, isError, error } = useListings({ ...filters, page, limit: 12 });

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRefresh = () => window.location.reload();

  const renderContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ListingSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100 shadow-sm animate-fade-in">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-red-800 font-bold text-xl mb-2">Oops! Something went wrong</p>
          <p className="text-sm text-red-600/80 mt-2 max-w-md mx-auto">
            {error instanceof Error ? error.message : 'We couldn\'t load any properties right now. Please try again.'}
          </p>
          <button 
            onClick={handleRefresh}
            className="mt-8 px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-bold shadow-lg shadow-red-200"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (data?.data?.length === 0) {
      return (
        <div className="text-center py-32 bg-white rounded-2xl border border-gray-200 shadow-sm animate-fade-in">
          <div className="text-6xl mb-6 grayscale opacity-40">🏘️</div>
          <p className="text-gray-900 text-2xl font-bold">No matches found</p>
          <p className="text-gray-500 mt-2 text-lg">Try adjusting your filters or search terms.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-10 px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
          >
            Clear All Search
          </button>
        </div>
      );
    }

    return (
      <div className="animate-fade-in">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {data?.data?.map((property) => (
            <ListingCard key={property.id} property={property} />
          ))}
        </div>
        <Pagination
          currentPage={data?.meta?.page || 1}
          totalPages={data?.meta?.total_pages || 1}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }, [isLoading, isError, data, error, handlePageChange]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
            Find the perfect <span className="text-blue-600">property</span> for you
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl font-medium leading-relaxed">
            Explore thousands of listings from across the country with precision and ease.
          </p>
        </div>

        <SearchHeader 
          onOpenFilters={() => setIsFilterDrawerOpen(true)} 
        />

        <FilterDrawer 
          isOpen={isFilterDrawerOpen} 
          onClose={() => setIsFilterDrawerOpen(false)} 
        />

        <div className="min-h-125 mt-4">
          {renderContent}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
