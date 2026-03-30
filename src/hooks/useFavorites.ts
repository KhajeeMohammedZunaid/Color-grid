import { useState, useEffect, useCallback } from 'react';
import { Palette } from '../data/palettes';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Palette[]>(() => {
    try {
      const saved = localStorage.getItem('colorgrid_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('colorgrid_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((palette: Palette) => {
    setFavorites(prev => {
      const exists = prev.some(p => p.id === palette.id);
      if (exists) {
        return prev.filter(p => p.id !== palette.id);
      }
      return [palette, ...prev];
    });
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.some(p => p.id === id);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
