import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Heart, Menu } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { DesktopCategories } from './DesktopCategories';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (window.innerWidth >= 768) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style.paddingRight = '';
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMobileMenuOpen]);

  const handleGenerate = () => {
    window.dispatchEvent(new CustomEvent('generate-palette'));
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <img
            src="/assets/logo.png"
            alt="ColorGrid logo"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
          />
          <h1 className="text-xl sm:text-2xl font-bold tracking-[-0.04em] text-gray-900">
            Color<span className="text-gray-900 font-black">Grid</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {location.pathname === '/' && (
            <button 
              onClick={handleGenerate}
              className="bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm tracking-[-0.02em] hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2 shadow-sm"
            >
              Generate
              <kbd className="hidden sm:inline-block ml-1 font-mono text-[10px] uppercase tracking-[2px] bg-white/20 px-1.5 py-0.5 rounded font-bold">Space</kbd>
            </button>
          )}

          {location.pathname !== '/' && (
            <Link 
              to="/favorites"
              className={`hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                location.pathname === '/favorites' 
                  ? 'bg-red-50 text-red-500' 
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${location.pathname === '/favorites' ? 'fill-red-500' : ''}`} />
              <span className="hidden sm:inline">Favorites</span>
            </Link>
          )}

          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 -mr-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <DesktopCategories />

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
}
