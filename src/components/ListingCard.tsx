import React from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../types/listing';

interface ListingCardProps {
  property: Property;
}


const ListingCard: React.FC<ListingCardProps> = ({ property }) => {
  const formattedPrice = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(Number(property.price));

  return (
    <Link to={`/listings/${property.id}`} className="card group hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm ${
            property.status === 'available' ? 'bg-green-100 text-green-800' :
            property.status === 'under_offer' ? 'bg-orange-100 text-orange-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {property.status.replace('_', ' ')}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            {property.propertyType}
          </span>
          <span className="text-lg font-bold text-gray-900">{formattedPrice}</span>
        </div>
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {property.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{property.suburb}</p>
        <div className="flex items-center gap-6 border-t border-gray-50 pt-4 mt-1">
          <div className="flex items-center gap-2 group/stat">
            <div className="p-1.5 bg-blue-50/50 rounded-lg text-blue-600 transition-colors group-hover/stat:bg-blue-600 group-hover/stat:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900 leading-none">{property.bedrooms}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Beds</span>
          </div>
          <div className="flex items-center gap-2 group/stat">
            <div className="p-1.5 bg-blue-50/50 rounded-lg text-blue-600 transition-colors group-hover/stat:bg-blue-600 group-hover/stat:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900 leading-none">{property.bathrooms}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Baths</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
