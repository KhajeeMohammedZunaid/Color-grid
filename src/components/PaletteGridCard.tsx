import React from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Heart } from 'lucide-react';
import { Palette } from '../data/palettes';
import { AnimatedCopyIcon } from './AnimatedCopyIcon';

export const PaletteGridCard = React.memo(function PaletteGridCard({ 
  palette, 
  isActive, 
  onSelect, 
  onCopy,
  isCopied,
  isFavorite,
  onToggleFavorite
}: { 
  palette: Palette, 
  isActive: boolean, 
  onSelect: (p: Palette) => void,
  onCopy: (p: Palette, e: React.MouseEvent) => void,
  isCopied: boolean,
  isFavorite: boolean,
  onToggleFavorite: (p: Palette, e: React.MouseEvent) => void
}) {
  return (
    <motion.div 
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(palette);
        }
      }}
      className={`flex flex-col gap-2 sm:gap-3 text-left group p-2 sm:p-3 rounded-3xl transition-shadow duration-300 relative cursor-pointer outline-none ${
        isActive 
          ? 'bg-white shadow-xl scale-[1.02] border border-gray-100' 
          : 'bg-white hover:shadow-lg border border-gray-100'
      }`}
      onClick={() => onSelect(palette)}
    >
      {/* Favorite button on hover or if already favorited */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        onClick={(e) => onToggleFavorite(palette, e)}
        className={`absolute top-4 left-4 z-10 transition-opacity duration-200 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-white focus:opacity-100 outline-none ${isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`w-3.5 h-3.5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
      </motion.button>

      {/* Copy entire palette button on hover */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => onCopy(palette, e)}
        className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-white focus:opacity-100 outline-none"
        title="Copy Palette Array"
        aria-label="Copy Palette Array"
      >
        <AnimatedCopyIcon isCopied={isCopied} className="w-3.5 h-3.5 text-gray-900" />
      </motion.button>

      <div className="h-20 sm:h-24 w-full rounded-2xl overflow-hidden flex shadow-sm relative">
        {palette.colors.map((c, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>
      <div className="flex flex-col px-2 pb-1">
        <span className={`text-xs sm:text-sm font-bold tracking-[-0.02em] truncate transition-colors text-gray-900`}>
          {palette.name}
        </span>
        {palette.name !== 'Generated' && (
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[2px] text-gray-900 truncate mt-0.5">
            {palette.category !== 'All' ? palette.category : 'Collection'}
          </span>
        )}
      </div>
    </motion.div>
  );
});
