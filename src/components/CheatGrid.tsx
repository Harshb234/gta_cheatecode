import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CheatCard from './CheatCard';
import { CheatCode } from '../types/CheatCode';

interface CheatGridProps {
  cheats: CheatCode[];
}

const CheatGrid: React.FC<CheatGridProps> = ({ cheats }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.children;
      
      gsap.fromTo(
        cards,
        { 
          y: 40, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all' // Clear props after animation to prevent conflicts with hover animations
        }
      );
    }
  }, [cheats]);

  if (cheats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-lg text-gray-400">No cheat codes found.</p>
      </div>
    );
  }

  return (
    <div 
      ref={gridRef} 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {cheats.map((cheat) => (
        <CheatCard key={cheat.id} cheat={cheat} />
      ))}
    </div>
  );
};

export default CheatGrid;