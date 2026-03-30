import React from 'react';
import { motion } from 'motion/react';

export function AnimatedCopyIcon({ isCopied, className = "w-3.5 h-3.5" }: { isCopied: boolean, className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 w-full h-full"
        initial={false}
        animate={{ opacity: isCopied ? 0 : 1, scale: isCopied ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </motion.svg>

      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 w-full h-full"
        initial={false}
        animate={{ opacity: isCopied ? 1 : 0, scale: isCopied ? 1 : 0.5 }}
        transition={{ duration: 0.15 }}
      >
        <motion.path
          d="M20 6 9 17l-5-5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isCopied ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: isCopied ? 0.1 : 0 }}
        />
      </motion.svg>
    </div>
  );
}
