import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, className = '' }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const header = headerRef.current;
    
    if (header) {
      const tl = gsap.timeline();
      
      tl.from(header.querySelector('h1'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      if (subtitle) {
        tl.from(header.querySelector('p'), {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out'
        }, '-=0.4');
      }
    }
  }, [subtitle]);
  
  return (
    <div ref={headerRef} className={`mb-8 text-center ${className}`}>
      <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2 text-white neon-text">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl text-gray-300">{subtitle}</p>
      )}
    </div>
  );
};

export default PageHeader;