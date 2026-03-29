import React, { useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Layout from '../components/Layout';
import DetailSkeleton from '../components/DetailSkeleton';
import { useListing } from '../hooks/useListings';
import { useAuthStore } from '../store/useAuthStore';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const { data, isLoading, isError, error } = useListing(id || '');
  
  const property = data?.data;

  const formattedPrice = useMemo(() => {
    if (!property) return '';
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(Number(property.price));
  }, [property]);

  const handleEnquire = useCallback(() => {
    alert('Enquiry feature coming soon!');
  }, []);

  const renderStatus = useCallback((status: string) => {
    return status.replace('_', ' ');
  }, []);

  const content = useMemo(() => {
    if (isLoading) {
      return <DetailSkeleton />;
    }

    if (isError || !property) {
      return (
        <div className="max-w-4xl mx-auto py-24 text-center bg-white rounded-3xl border border-gray-100 shadow-sm mt-8 animate-fade-in">
          <div className="text-6xl mb-6">🏜️</div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Listing not found</h2>
          <p className="text-gray-500 mb-10 text-lg max-w-md mx-auto font-medium">
            {isError && error instanceof Error ? error.message : "The property you are looking for might have been sold or removed."}
          </p>
          <Link to="/" className="btn-primary px-10 py-3 rounded-xl font-black shadow-xl shadow-blue-100">
            Back to Search
          </Link>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto py-6 animate-fade-in">
        <Link to="/" className="text-sm font-black text-blue-600 hover:text-blue-700 flex items-center mb-8 transition-colors group">
           <Icon icon="mage:arrow-left" className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
           Back to Search
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="rounded-[2.5rem] overflow-hidden bg-gray-100 aspect-video relative shadow-2xl shadow-gray-200 group border-8 border-white">
              {property.imageUrl ? (
                <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                  <Icon icon="mage:image" className="w-16 h-16 mb-4" />
                  <span className="font-black uppercase tracking-widest text-xs">No photos available</span>
                </div>
              )}
              <div className="absolute top-6 left-6">
                <span className="px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest text-blue-900 shadow-xl border border-white">
                  {property.propertyType}
                </span>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
              {user?.role === 'ADMIN' && (
                <div className="mb-6 -mx-10 -mt-10 bg-rose-50/70 border-b border-rose-100/80 px-8 py-3 flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 shrink-0">
                    Internal Admin Only Notes:
                  </span>
                  <span className="text-xs font-bold text-rose-800 truncate">
                    {property.internalNotes || "No internal notes."}
                  </span>
                </div>


              )}

              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-10 gap-8">
                <div className="flex-1 text-left">
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-[1.1] mb-4">{property.title}</h1>
                  <p className="text-gray-500 text-lg flex items-center font-bold">
                    <Icon icon="mage:location" className="w-6 h-6 mr-3 text-blue-600" />
                    {property.address}, {property.suburb}, {property.state}
                  </p>
                </div>
                <div className="text-5xl font-black text-blue-600 sm:text-right whitespace-nowrap tracking-tighter">
                  {formattedPrice}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 bg-gray-50/50 rounded-3xl mb-12 border border-gray-100">
                <div className="text-left group/stat">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 group-hover/stat:text-blue-500 transition-colors">Bedrooms</div>
                  <div className="flex items-center justify-start gap-2.5">
                    <Icon icon="mage:bed" className="w-5 h-5 text-gray-400 group-hover/stat:text-blue-600 transition-all" />
                    <span className="text-2xl font-black text-gray-900 leading-none">{property.bedrooms}</span>
                  </div>
                </div>
                <div className="text-left group/stat">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 group-hover/stat:text-blue-500 transition-colors">Bathrooms</div>
                  <div className="flex items-center justify-start gap-2.5">
                    <Icon icon="mage:bath" className="w-5 h-5 text-gray-400 group-hover/stat:text-blue-600 transition-all" />
                    <span className="text-2xl font-black text-gray-900 leading-none">{property.bathrooms}</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Status</div>
                  <div className="text-xs font-black text-blue-600 uppercase mt-2 tracking-widest bg-blue-50 py-2 px-4 rounded-xl border border-blue-100 w-fit">{renderStatus(property.status)}</div>
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Type</div>
                  <div className="text-xs font-black text-gray-700 uppercase mt-2 tracking-widest bg-gray-100 py-2 px-4 rounded-xl w-fit">{property.propertyType}</div>
                </div>
              </div>

              <div className="prose prose-slate prose-lg max-w-none text-left">
                <h2 className="text-2xl font-black text-gray-900 mb-8 border-b border-gray-100 pb-4 tracking-tight">Property Description</h2>
                <p className="text-gray-600 font-medium leading-relaxed whitespace-pre-wrap">{property.description || 'No description provided.'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 sticky top-24">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-10 border-b border-gray-50 pb-5 text-center">Listing Agent</h3>
              {property.agent ? (
                <div className="space-y-10 text-left">
                  <div className="flex items-center gap-6 pb-6 border-b border-gray-50">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg border-2 border-white">
                      {property.agent.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-xl tracking-tight leading-tight">{property.agent.name}</h4>
                      <div className="inline-flex items-center text-green-600 mt-1">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                        <span className="text-[9px] font-black uppercase tracking-widest">Verified Agent</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <a href={`mailto:${property.agent.email}`} className="flex items-center text-sm font-bold text-gray-600 hover:text-blue-600 transition-all px-2 py-1 group">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-blue-50 transition-colors">
                        <Icon icon="mage:email" className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </div>
                      {property.agent.email}
                    </a>
                    <a href={`tel:${property.agent.phone}`} className="flex items-center text-sm font-bold text-gray-600 hover:text-blue-600 transition-all px-2 py-1 group">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-blue-50 transition-colors">
                        <Icon icon="mage:phone" className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </div>
                      {property.agent.phone || 'N/A'}
                    </a>
                  </div>

                  <button 
                    onClick={handleEnquire}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl shadow-lg shadow-blue-100 transition-all font-black text-base tracking-tight active:scale-[0.98]"
                  >
                    Enquire Now
                  </button>
                </div>
              ) : (
                <div className="p-8 bg-gray-50 rounded-3xl text-center border border-dashed border-gray-200">
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Agent information not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }, [isLoading, isError, error, property, user?.role, formattedPrice, handleEnquire, renderStatus]);

  return (
    <Layout>
      {content}
    </Layout>
  );
};

export default DetailPage;
