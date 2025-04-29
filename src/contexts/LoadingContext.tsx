import React, { createContext, useState, useContext, useEffect } from 'react';
import { gsap } from 'gsap';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingBar, setLoadingBar] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create loading bar element
    const bar = document.createElement('div');
    bar.className = 'loading-bar';
    document.body.appendChild(bar);
    setLoadingBar(bar);

    return () => {
      document.body.removeChild(bar);
    };
  }, []);

  const startLoading = () => {
    setIsLoading(true);
    if (loadingBar) {
      // Reset the bar
      gsap.set(loadingBar, { right: '100%' });
      
      // Animate to 70% quickly
      gsap.to(loadingBar, {
        right: '30%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const stopLoading = () => {
    if (loadingBar) {
      // Complete the animation
      gsap.to(loadingBar, {
        right: '0%',
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          // Hide the bar after a short delay
          gsap.to(loadingBar, {
            opacity: 0,
            duration: 0.3,
            delay: 0.2,
            onComplete: () => {
              gsap.set(loadingBar, { right: '100%', opacity: 1 });
              setIsLoading(false);
            },
          });
        },
      });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};