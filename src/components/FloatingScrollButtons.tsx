import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export function FloatingScrollButtons() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [returnScrollY, setReturnScrollY] = useState<number | null>(null);

  useEffect(() => {
    const handleSaveScroll = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (customEvent.detail > 100) {
        setReturnScrollY(customEvent.detail);
      }
    };
    window.addEventListener('save-scroll-position', handleSaveScroll);
    return () => window.removeEventListener('save-scroll-position', handleSaveScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsAtTop(currentScroll < 100);
      
      // Clear the return position if the user manually scrolls past it
      if (returnScrollY !== null && currentScroll > returnScrollY + 100) {
        setReturnScrollY(null);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [returnScrollY]);

  const scrollToTop = () => {
    setReturnScrollY(window.scrollY);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollDown = () => {
    if (returnScrollY !== null) {
      window.scrollTo({ top: returnScrollY, behavior: 'smooth' });
      setReturnScrollY(null); // Clear it after returning
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        {!isAtTop ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-gray-900/90 backdrop-blur-md border border-white/10 shadow-xl rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
            title="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollDown}
            className="w-12 h-12 bg-gray-900/90 backdrop-blur-md border border-white/10 shadow-xl rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
            title={returnScrollY ? "Return to previous position" : "Scroll to bottom"}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
