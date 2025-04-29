import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    
    if (container) {
      // Create a glitch effect
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      
      tl.to(container.querySelector('h1'), {
        skewX: 20,
        duration: 0.1,
        ease: 'power3.inOut'
      })
        .to(container.querySelector('h1'), {
          opacity: 0.3,
          duration: 0.1,
          ease: 'none'
        })
        .to(container.querySelector('h1'), {
          skewX: 0,
          opacity: 1,
          duration: 0.1,
          ease: 'power3.out'
        })
        .to(container.querySelector('h1'), {
          skewX: -15,
          duration: 0.1,
          delay: 0.15,
          ease: 'power3.inOut'
        })
        .to(container.querySelector('h1'), {
          opacity: 0.6,
          duration: 0.1,
          ease: 'none'
        })
        .to(container.querySelector('h1'), {
          skewX: 0,
          opacity: 1,
          duration: 0.1,
          ease: 'power3.out'
        });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AlertTriangle className="h-20 w-20 text-error mb-6" />
      
      <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6 text-white neon-pink-text">
        BUSTED
      </h1>
      
      <p className="text-2xl text-gray-300 mb-12 max-w-xl">
        Error 404: Page not found. Looks like this area of Los Santos doesn't exist.
      </p>
      
      <Link to="/" className="gta-button px-8 py-4 flex items-center">
        <Home className="mr-2" /> Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;