import React, { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Palette } from '../data/palettes';

interface UsePaletteActionsProps {
  setActivePalette: (p: Palette) => void;
}

export function usePaletteActions({ setActivePalette }: UsePaletteActionsProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [copiedPalette, setCopiedPalette] = useState<string | null>(null);

  const writeToClipboard = useCallback((text: string): Promise<void> => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise((resolve, reject) => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        textArea.style.pointerEvents = 'none';
        document.body.appendChild(textArea);
        textArea.select();

        const copied = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (copied) {
          resolve();
          return;
        }
      } catch {
        // Fall through to reject below.
      }

      reject(new Error('Clipboard copy failed'));
    });
  }, []);

  const copyToClipboard = useCallback((text: string, type: 'color' | 'palette', id: string) => {
    void writeToClipboard(text)
      .then(() => {
        if (type === 'color') {
          setCopiedColor(text);
          toast.success(`Copied ${text} to clipboard`);
          setTimeout(() => setCopiedColor(null), 1500);
        } else {
          setCopiedPalette(id);
          toast.success('Palette array copied to clipboard');
          setTimeout(() => setCopiedPalette(null), 1500);
        }
      })
      .catch(() => {
        toast.error('Copy failed. Please copy manually.');
      });
  }, [writeToClipboard]);

  const handleSelectPalette = useCallback((p: Palette) => {
    const currentScroll = window.scrollY;
    window.dispatchEvent(new CustomEvent('save-scroll-position', { detail: currentScroll }));
    setActivePalette(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success(`${p.name} set as active palette`);
  }, [setActivePalette]);

  const handleCopyPaletteArray = useCallback((p: Palette, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentScroll = window.scrollY;
    window.dispatchEvent(new CustomEvent('save-scroll-position', { detail: currentScroll }));
    copyToClipboard(JSON.stringify(p.colors), 'palette', p.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [copyToClipboard]);

  return {
    copiedColor,
    copiedPalette,
    copyToClipboard,
    handleSelectPalette,
    handleCopyPaletteArray
  };
}
