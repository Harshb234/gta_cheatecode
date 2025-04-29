import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Github, Twitter, Gamepad2 } from 'lucide-react';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    
    if (footer) {
      gsap.from(footer, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          toggleActions: 'play none none none'
        }
      });
    }
  }, []);

  return (
    <footer ref={footerRef} className="bg-black bg-opacity-90 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <Gamepad2 className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-heading text-primary neon-text">GTA5</span>
              <span className="ml-1 text-xl font-heading text-secondary neon-pink-text">CHEATS</span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              The ultimate resource for GTA 5 cheat codes
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-accent">
                Explore
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/cheats" className="text-gray-300 hover:text-primary">
                    Cheat Codes
                  </Link>
                </li>
                <li>
                  <Link to="/models" className="text-gray-300 hover:text-primary">
                    3D Models
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-accent">
                Platforms
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-300 hover:text-primary">PC</li>
                <li className="text-gray-300 hover:text-primary">PlayStation</li>
                <li className="text-gray-300 hover:text-primary">Xbox</li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-accent">
                Connect
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} GTA5 Cheat Hub. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-4 md:mt-0">
            Not affiliated with Rockstar Games
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;