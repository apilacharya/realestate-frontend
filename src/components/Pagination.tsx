import React, { useCallback, useMemo } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }, [currentPage, totalPages, onPageChange]);

  const handlePageClick = useCallback((page: number) => {
    onPageChange(page);
  }, [onPageChange]);

  const pageNumbers = useMemo(() => {
    return [...Array(totalPages)].map((_, i) => i + 1);
  }, [totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-12 pb-8">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
      >
        Previous
      </button>
      
      <div className="flex space-x-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`w-10 h-10 rounded-lg text-sm font-black transition-all shadow-sm ${
              currentPage === page
                ? 'bg-blue-600 text-white scale-110 shadow-blue-200'
                : 'bg-white border border-gray-100 text-gray-600 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

