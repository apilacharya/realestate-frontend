import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuthStore } from '../store/useAuthStore';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuthStore();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout.mutateAsync();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-outfit">
      <header className="bg-gray-50/80 backdrop-blur-lg border-b border-gray-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight">
            RealEstate<span className="text-gray-900">Hub</span>
          </Link>

          <nav className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-sm transition-all hover:border-blue-200 hover:shadow-md group cursor-default">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon icon="mage:user" className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-black text-gray-800 tracking-tight">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold flex items-center gap-2 group"
                  disabled={logout.isPending}
                  title="Logout"
                >
                  <Icon icon="mage:logout" className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 transition-all">
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-transparent border-t border-gray-200/60 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm font-medium text-gray-400">
          © 2026 RealEstateHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
