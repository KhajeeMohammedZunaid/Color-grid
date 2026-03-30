/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import { CATEGORIES } from './constants';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingScrollButtons } from './components/FloatingScrollButtons';
import { ErrorBoundary } from './components/ErrorBoundary';

const CategoryPage = lazy(() => import('./pages/CategoryPage').then(module => ({ default: module.CategoryPage })));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage').then(module => ({ default: module.FavoritesPage })));

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-gray-900 font-sans selection:bg-black selection:text-white pb-20 sm:pb-0">
        <Toaster position="bottom-center" />
        <Header />
        <main className="flex-1">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        <FloatingScrollButtons />
      </div>
    </BrowserRouter>
  );
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<CategoryPage category="All" />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        {CATEGORIES.filter(c => c !== 'All').map(cat => {
          return (
            <Route 
              key={cat} 
              path={`/${cat.toLowerCase().replace(/\s+/g, '-')}`} 
              element={<CategoryPage category={cat} />} 
            />
          );
        })}
      </Routes>
    </AnimatePresence>
  );
}
