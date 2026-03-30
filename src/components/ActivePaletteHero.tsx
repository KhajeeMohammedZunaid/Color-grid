import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Heart } from 'lucide-react';
import { Palette } from '../data/palettes';
import { getContrastYIQ } from '../utils/colors';
import { AnimatedCopyIcon } from './AnimatedCopyIcon';

interface ActivePaletteHeroProps {
  activePalette: Palette;
  copiedColor: string | null;
  copiedPalette: string | null;
  onCopy: (text: string, type: 'color' | 'palette', id: string) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ActivePaletteHero = React.memo(function ActivePaletteHero({
  activePalette,
  copiedColor,
  copiedPalette,
  onCopy,
  isFavorite,
  onToggleFavorite
}: ActivePaletteHeroProps) {
  return (
    <div className="mb-12 sm:mb-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold tracking-[-0.04em] text-gray-900">
          {activePalette.name}
        </h2>
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleFavorite}
            className="flex items-center justify-center w-8 h-8 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
          </motion.button>
          <button 
            onClick={() => onCopy(JSON.stringify(activePalette.colors), 'palette', activePalette.id)}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-900 transition-colors bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-50"
          >
            <AnimatedCopyIcon isCopied={copiedPalette === activePalette.id} className="w-3.5 h-3.5" />
            <span className="w-[100px] text-center">
              {copiedPalette === activePalette.id ? 'COPIED PALETTE' : 'COPY PALETTE'}
            </span>
          </button>
        </div>
      </div>
      
      <div className="flex h-32 sm:h-48 md:h-64 w-full rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-sm border border-gray-200 bg-white">
        <AnimatePresence mode="popLayout">
          {activePalette.colors.map((color, index) => {
            const contrastColor = getContrastYIQ(color) === 'black' ? '#000000' : '#FFFFFF';
            const bgOverlay = getContrastYIQ(color) === 'black' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.15)';
            const isCopied = copiedColor === color;

            return (
              <motion.div
                key={`${activePalette.id}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex-1 relative group cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => onCopy(color, 'color', activePalette.id)}
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/0 hover:bg-black/5">
                  <div 
                    className="p-2 sm:p-3 rounded-full backdrop-blur-md transition-transform duration-200 scale-90 group-hover:scale-100 shadow-sm mb-2 sm:mb-3"
                    style={{ backgroundColor: bgOverlay, color: contrastColor }}
                  >
                    <AnimatedCopyIcon isCopied={isCopied} className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span 
                    className="font-mono text-xs sm:text-sm font-medium tracking-[-0.02em] px-2 py-1 rounded backdrop-blur-md"
                    style={{ backgroundColor: bgOverlay, color: contrastColor }}
                  >
                    {isCopied ? 'COPIED' : color.toUpperCase()}
                  </span>
                </div>

                {/* Default Hex Display (Hidden on hover) */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                  <span 
                    className="font-mono text-[10px] sm:text-xs font-bold tracking-[-0.01em]"
                    style={{ color: contrastColor }}
                  >
                    {color.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
});
