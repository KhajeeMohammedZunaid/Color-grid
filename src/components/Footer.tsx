import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <div className="fixed bottom-6 inset-x-0 z-40 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-start">
        <a
          href="https://x.com/detroxff17"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900/90 backdrop-blur-md border border-white/10 shadow-lg rounded-full px-3.5 py-2 text-xs font-medium text-gray-300 flex items-center gap-1.5 pointer-events-auto hover:bg-black transition-colors"
          aria-label="Visit Zunaid on X"
        >
          Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by <span className="font-bold text-white tracking-wide">Zunaid</span>
        </a>
      </div>
    </div>
  );
}
