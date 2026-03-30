import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Palette } from '../data/palettes';
import { PaletteGridCard } from '../components/PaletteGridCard';
import { ActivePaletteHero } from '../components/ActivePaletteHero';
import { useFavorites } from '../hooks/useFavorites';
import { usePaletteActions } from '../hooks/usePaletteActions';
import { Heart } from 'lucide-react';

export function FavoritesPage() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [activePalette, setActivePalette] = useState<Palette | null>(favorites[0] || null);
  
  const {
    copiedColor,
    copiedPalette,
    copyToClipboard,
    handleSelectPalette,
    handleCopyPaletteArray
  } = usePaletteActions({ setActivePalette });

  const handleToggleFavorite = useCallback((p: Palette, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    toggleFavorite(p);
    if (isFavorite(p.id)) {
      toast.success(`Removed ${p.name} from favorites`);
      if (activePalette?.id === p.id && favorites.length > 1) {
        const nextActive = favorites.find(fav => fav.id !== p.id);
        if (nextActive) setActivePalette(nextActive);
      } else if (favorites.length === 1) {
        setActivePalette(null);
      }
    } else {
      toast.success(`Added ${p.name} to favorites`);
    }
  }, [toggleFavorite, isFavorite, activePalette, favorites]);

  if (favorites.length === 0) {
    return (
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 flex flex-col items-center justify-center text-center"
      >
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h2>
        <p className="text-gray-500 max-w-md">
          Start exploring palettes and click the heart icon to save your favorites here. They'll be securely stored in your browser.
        </p>
      </motion.main>
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12"
    >
      {activePalette && (
        <ActivePaletteHero 
          activePalette={activePalette}
          copiedColor={copiedColor}
          copiedPalette={copiedPalette}
          onCopy={copyToClipboard}
          isFavorite={isFavorite(activePalette.id)}
          onToggleFavorite={() => handleToggleFavorite(activePalette)}
        />
      )}

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[3px] text-gray-900 mb-4 sm:mb-6">
          Your Favorites
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {favorites.map((p) => (
            <PaletteGridCard 
              key={p.id} 
              palette={p} 
              isActive={activePalette?.id === p.id}
              onSelect={handleSelectPalette} 
              onCopy={handleCopyPaletteArray}
              isCopied={copiedPalette === p.id}
              isFavorite={true}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </div>
    </motion.main>
  );
}
