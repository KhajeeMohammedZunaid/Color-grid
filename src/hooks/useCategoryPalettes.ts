import { useState, useEffect, useCallback } from 'react';
import { Category } from '../constants';
import { predefinedPalettes, Palette } from '../data/palettes';
import { generateSmartPalette } from '../utils/colors';

export function useCategoryPalettes(category: Category, inView: boolean) {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [activePalette, setActivePalette] = useState<Palette | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewPalette = useCallback((cat: Category): Palette => {
    const newColors = generateSmartPalette(cat);
    return {
      id: `gen-${Date.now()}-${Math.random()}`,
      name: 'Generated',
      colors: newColors,
      category: cat
    };
  }, []);

  // Initialize palettes when category changes
  useEffect(() => {
    const initial = category === 'All' 
      ? predefinedPalettes 
      : predefinedPalettes.filter(p => p.category === category);
    
    setPalettes(initial);
    setActivePalette(initial[0] || generateNewPalette(category));
  }, [category, generateNewPalette]);

  // Infinite scroll
  useEffect(() => {
    if (inView && category === 'All' && !isGenerating) {
      setIsGenerating(true);
      // Slight delay to yield to browser paint and prevent lag
      setTimeout(() => {
        const newBatch = Array.from({ length: 12 }).map(() => generateNewPalette(category));
        setPalettes(prev => [...prev, ...newBatch]);
        setIsGenerating(false);
      }, 50);
    }
  }, [inView, category, generateNewPalette, isGenerating]);

  // Global generate event
  useEffect(() => {
    const handleGenerate = () => {
      if (category !== 'All') return;
      const p = generateNewPalette(category);
      setPalettes(prev => [p, ...prev]);
      setActivePalette(p);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        const target = e.target as HTMLElement;
        
        // Do not intercept if the user is interacting with a button, link, or input
        if (
          target.tagName === 'INPUT' || 
          target.tagName === 'TEXTAREA' || 
          target.tagName === 'BUTTON' ||
          target.getAttribute('role') === 'button'
        ) {
          return;
        }

        e.preventDefault(); // Prevent the default browser scroll down behavior everywhere
        
        if (category === 'All') {
          handleGenerate();
        }
      }
    };

    if (category === 'All') {
      window.addEventListener('generate-palette', handleGenerate);
    }
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('generate-palette', handleGenerate);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [category, generateNewPalette]);

  return {
    palettes,
    activePalette,
    setActivePalette
  };
}
