import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CheatCodesPage from './pages/CheatCodesPage';
import AboutPage from './pages/AboutPage';
import ModelViewerPage from './pages/ModelViewerPage';
import NotFoundPage from './pages/NotFoundPage';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingProvider } from './contexts/LoadingContext';

function App() {
  // Initialize GSAP once
  useEffect(() => {
    // Default GSAP settings
    gsap.config({
      nullTargetWarn: false,
    });
    
    // Prevent GSAP from auto-creating a context
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <ThemeProvider>
      <LoadingProvider>
        <FavoritesProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/cheats" element={<CheatCodesPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/models" element={<ModelViewerPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </FavoritesProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;