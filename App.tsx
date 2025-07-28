import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy load pages for better initial load performance.
const AboutPage = lazy(() => import('./pages/AboutPage'));
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'));
const BeliefsPage = lazy(() => import('./pages/BeliefsPage'));
const VisitUsPage = lazy(() => import('./pages/VisitUsPage'));

/**
 * A simple loading spinner component to be used with Suspense
 * while lazy-loaded pages are being fetched.
 */
const LoadingSpinner: React.FC = () => (
  <div className="flex-grow flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-sky-700"></div>
  </div>
);

/**
 * The main application component.
 * It sets up the main layout with a header and footer,
 * and handles routing for the different pages of the site using React Router.
 * Pages are lazy-loaded for performance.
 * @returns {React.ReactElement} The rendered App component.
 */
const App: React.FC = () => {
  return (
    <div className="bg-stone-50 text-stone-800 font-sans antialiased flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/beliefs" element={<BeliefsPage />} />
            <Route path="/visit" element={<VisitUsPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
