import React, { useCallback } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'sonner';
import { Category } from '../constants';
import { Palette } from '../data/palettes';
import { PaletteGridCard } from '../components/PaletteGridCard';
import { ActivePaletteHero } from '../components/ActivePaletteHero';
import { useFavorites } from '../hooks/useFavorites';
import { useCategoryPalettes } from '../hooks/useCategoryPalettes';
import { usePaletteActions } from '../hooks/usePaletteActions';

export function CategoryPage({ category }: { category: Category }) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '600px' });
  const { palettes, activePalette, setActivePalette } = useCategoryPalettes(category, inView);
  
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
    } else {
      toast.success(`Added ${p.name} to favorites`);
    }
  }, [toggleFavorite, isFavorite]);

  if (!activePalette) return null;

  return (
    <motion.main 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12"
    >
      {/* Hero: Active Palette */}
      <ActivePaletteHero 
        activePalette={activePalette}
        copiedColor={copiedColor}
        copiedPalette={copiedPalette}
        onCopy={copyToClipboard}
        isFavorite={isFavorite(activePalette.id)}
        onToggleFavorite={() => handleToggleFavorite(activePalette)}
      />

      {/* Grid: All Palettes */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[3px] text-gray-900 mb-4 sm:mb-6">
          {category === 'All' ? 'Infinite Collection' : `${category} Collection`}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {palettes.map((p) => (
            <PaletteGridCard 
              key={p.id} 
              palette={p} 
              isActive={activePalette.id === p.id}
              onSelect={handleSelectPalette} 
              onCopy={handleCopyPaletteArray}
              isCopied={copiedPalette === p.id}
              isFavorite={isFavorite(p.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
        
        {/* Infinite Scroll Trigger (Invisible Preloader) */}
        {category === 'All' && (
          <div ref={ref} className="h-10 mt-8" aria-hidden="true" />
        )}
      </div>
    </motion.main>
  );
}
