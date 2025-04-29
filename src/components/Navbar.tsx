import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Star, Sun, Moon } from 'lucide-react';
import { gsap } from 'gsap';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Animation on mount
  useEffect(() => {
    const navbar = navRef.current;
    if (navbar) {
      gsap.from(navbar, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, []);

  return (
    <nav ref={navRef} className="bg-black bg-opacity-90 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-heading text-primary neon-text">GTA5</span>
              <span className="ml-2 text-2xl font-heading text-secondary neon-pink-text">CHEATS</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/cheats" label="Cheat Codes" />
            <NavLink to="/models" label="3D Models" />
            <NavLink to="/about" label="About" />
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-accent" />}
            </button>
            
            <Link 
              to="/cheats" 
              className="relative p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Favorites"
            >
              <Star size={20} className="text-accent" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-expanded={isOpen}
                aria-label="Main menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black">
          <MobileNavLink to="/" label="Home" />
          <MobileNavLink to="/cheats" label="Cheat Codes" />
          <MobileNavLink to="/models" label="3D Models" />
          <MobileNavLink to="/about" label="About" />
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
        isActive 
          ? 'text-primary border-b-2 border-primary' 
          : 'text-gray-300 hover:text-primary hover:border-b-2 hover:border-primary'
      }`}
    >
      {label}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive 
          ? 'bg-gray-900 text-primary' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-primary'
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;