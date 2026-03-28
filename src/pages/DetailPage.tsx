import React, { useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
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
           <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
           </svg>
           Back to Search
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="rounded-[2.5rem] overflow-hidden bg-gray-100 aspect-video relative shadow-2xl shadow-gray-200 group border-8 border-white">
              {property.imageUrl ? (
                <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-black uppercase tracking-widest text-xs">No photos available</span>
                </div>
              )}
              <div className="absolute top-6 left-6">
                <span className="px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest text-blue-900 shadow-xl border border-white">
                  {property.propertyType}
                </span>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-10 gap-8">
                <div className="flex-1">
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-[1.1] mb-4">{property.title}</h1>
                  <p className="text-gray-500 text-lg flex items-center font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {property.address}, {property.suburb}, {property.state}
                  </p>
                </div>
                <div className="text-5xl font-black text-blue-600 sm:text-right whitespace-nowrap tracking-tighter">
                  {formattedPrice}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 bg-gray-50/50 rounded-3xl mb-12 border border-gray-100">
                <div className="text-center group/stat">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 group-hover/stat:text-blue-500 transition-colors">Bedrooms</div>
                  <div className="flex items-center justify-center gap-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 group-hover/stat:text-blue-600 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-2xl font-black text-gray-900 leading-none">{property.bedrooms}</span>
                  </div>
                </div>
                <div className="text-center group/stat">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 group-hover/stat:text-blue-500 transition-colors">Bathrooms</div>
                  <div className="flex items-center justify-center gap-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 group-hover/stat:text-blue-600 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-2xl font-black text-gray-900 leading-none">{property.bathrooms}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Status</div>
                  <div className="text-xs font-black text-blue-600 uppercase mt-2 tracking-widest bg-blue-50 py-2 px-4 rounded-xl border border-blue-100">{renderStatus(property.status)}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Type</div>
                  <div className="text-xs font-black text-gray-700 uppercase mt-2 tracking-widest bg-gray-100 py-2 px-4 rounded-xl">{property.propertyType}</div>
                </div>
              </div>

              <div className="prose prose-slate prose-lg max-w-none">
                <h2 className="text-2xl font-black text-gray-900 mb-8 border-b border-gray-100 pb-4 tracking-tight">Property Description</h2>
                <p className="text-gray-600 font-medium leading-relaxed whitespace-pre-wrap">{property.description || 'No description provided.'}</p>
              </div>
            </div>

            {user?.role === 'ADMIN' && property.internalNotes && (
              <div className="bg-amber-50 border-2 border-amber-200 p-10 rounded-[2.5rem] shadow-sm animate-fade-in">
                <h3 className="text-amber-900 font-black mb-6 flex items-center text-xl uppercase tracking-tighter">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 mr-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Admin-Only Internal Notes
                </h3>
                <div className="p-6 bg-white rounded-2xl border border-amber-100 text-amber-900 text-base leading-relaxed font-bold italic shadow-inner">
                  {property.internalNotes}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 sticky top-24">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-10 border-b border-gray-50 pb-5 text-center">Listing Agent</h3>
              {property.agent ? (
                <div className="space-y-10 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-28 h-28 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white font-black text-5xl shadow-2xl shadow-blue-200 mb-8 rotate-3 hover:rotate-0 transition-all duration-500 cursor-default border-4 border-white">
                      {property.agent.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-2xl tracking-tight leading-tight mb-2">{property.agent.name}</h4>
                      <div className="inline-flex items-center px-4 py-1.5 bg-green-50 text-green-600 rounded-full border border-green-100">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-2.5 animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Agent</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <a href={`mailto:${property.agent.email}`} className="flex items-center justify-center text-sm font-bold text-gray-700 hover:text-blue-600 transition-all p-5 bg-gray-50 rounded-2xl group border border-transparent hover:border-blue-100 shadow-sm hover:shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3.5 group-hover:scale-125 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {property.agent.email}
                    </a>
                    <a href={`tel:${property.agent.phone}`} className="flex items-center justify-center text-sm font-bold text-gray-700 hover:text-blue-600 transition-all p-5 bg-gray-50 rounded-2xl group border border-transparent hover:border-blue-100 shadow-sm hover:shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3.5 group-hover:scale-125 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {property.agent.phone || 'No phone provided'}
                    </a>
                  </div>

                  <button 
                    onClick={handleEnquire}
                    className="w-full bg-gray-900 hover:bg-black text-white py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all font-black text-lg tracking-tight active:scale-95 mt-4"
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
