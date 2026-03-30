import React from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence initial={false}>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 z-[100] md:hidden will-change-[opacity]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.32 }}
            className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-white z-[101] shadow-2xl flex flex-col md:hidden transform-gpu will-change-transform"
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
              <span className="font-bold text-lg tracking-tight text-gray-900">Menu</span>
              <button 
                onClick={onClose}
                className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 custom-scrollbar">
              <Link 
                to="/favorites"
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors mb-2 ${
                  location.pathname === '/favorites' 
                    ? 'bg-red-50 text-red-500' 
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${location.pathname === '/favorites' ? 'fill-red-500' : ''}`} />
                Favorites
              </Link>
              
              <div className="h-px bg-gray-100 my-2 mx-2" />
              
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Categories
              </div>
              
              {CATEGORIES.map(category => {
                const path = category === 'All' ? '/' : `/${category.toLowerCase().replace(/\s+/g, '-')}`;
                const isActive = location.pathname === path;
                return (
                  <NavLink
                    key={category}
                    to={path}
                    onClick={onClose}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-gray-900 text-white font-bold' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {category}
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
