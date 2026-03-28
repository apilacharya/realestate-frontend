import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-4">
      <div className="mb-6">
        <Skeleton width={120} height={20} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-xl overflow-hidden aspect-video relative shadow-sm">
            <Skeleton height="100%" borderRadius={0} />
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <Skeleton width={300} height={32} className="mb-2" />
                <Skeleton width={200} height={20} />
              </div>
              <Skeleton width={150} height={40} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center p-2">
                  <Skeleton width={60} height={12} className="mb-2" />
                  <Skeleton width={40} height={24} />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Skeleton width={120} height={24} className="mb-4" />
              <Skeleton count={5} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <Skeleton width={150} height={24} className="mb-6" />
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Skeleton circle width={56} height={56} />
                <div className="flex-1">
                  <Skeleton width="60%" height={16} />
                  <Skeleton width="40%" height={12} />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton height={44} borderRadius={8} />
                <Skeleton height={44} borderRadius={8} />
              </div>
              <Skeleton height={48} borderRadius={8} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
