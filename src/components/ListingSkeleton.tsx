import 'react-loading-skeleton/dist/skeleton.css';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ListingSkeleton: React.FC = () => {
  return (
    <div className="card flex flex-col h-full overflow-hidden">
      <div className="aspect-[4/3]">
        <Skeleton height="100%" borderRadius={0} />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <Skeleton width={60} height={16} />
          <Skeleton width={80} height={24} />
        </div>
        <Skeleton width="90%" height={20} />
        <Skeleton width="40%" height={16} />
        <div className="pt-3 border-t border-gray-100 flex space-x-4">
          <Skeleton width={40} height={16} />
          <Skeleton width={40} height={16} />
        </div>
      </div>
    </div>
  );
};

export default ListingSkeleton;
