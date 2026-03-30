import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { CATEGORIES } from '../constants';

export function DesktopCategories() {
  const location = useLocation();

  return (
    <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto gap-1 sm:gap-2 custom-scrollbar items-center">
      {CATEGORIES.map(category => {
        const path = category === 'All' ? '/' : `/${category.toLowerCase().replace(/\s+/g, '-')}`;
        const isActive = location.pathname === path;
        return (
          <NavLink
            key={category}
            to={path}
            className="relative px-4 py-2 rounded-full text-sm font-medium tracking-[-0.01em] transition-colors duration-200 outline-none whitespace-nowrap"
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-gray-900 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={`relative z-10 font-bold ${isActive ? 'text-white' : 'text-gray-900 hover:text-black'}`}>
              {category}
            </span>
          </NavLink>
        );
      })}
      
      {location.pathname === '/' && (
        <div className="ml-auto pl-4 border-l border-gray-200">
          <Link 
            to="/favorites"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-colors text-gray-900 hover:bg-gray-100"
          >
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Favorites</span>
          </Link>
        </div>
      )}
    </div>
  );
}
