import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
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
    <Link to={`/listings/${property.id}`} className="card group hover:shadow-md transition-shadow flex flex-col overflow-hidden">
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
              <Icon icon="mage:bed" className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-gray-900 leading-none">{property.bedrooms}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Beds</span>
          </div>
          <div className="flex items-center gap-2 group/stat">
            <div className="p-1.5 bg-blue-50/50 rounded-lg text-blue-600 transition-colors group-hover/stat:bg-blue-600 group-hover/stat:text-white">
              <Icon icon="mage:bath" className="w-4 h-4" />
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
