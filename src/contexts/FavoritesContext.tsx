import React, { createContext, useState, useEffect, useContext } from 'react';
import { CheatCode } from '../types/CheatCode';

interface FavoritesContextType {
  favorites: CheatCode[];
  addFavorite: (cheat: CheatCode) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export const useFavorites = () => useContext(FavoritesContext);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  // Load favorites from localStorage
  const [favorites, setFavorites] = useState<CheatCode[]>(() => {
    const savedFavorites = localStorage.getItem('gta-favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('gta-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (cheat: CheatCode) => {
    setFavorites((prevFavorites) => {
      // Check if cheat is already a favorite
      if (prevFavorites.some((favCheat) => favCheat.id === cheat.id)) {
        return prevFavorites;
      }
      return [...prevFavorites, cheat];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((cheat) => cheat.id !== id));
  };

  const isFavorite = (id: number) => favorites.some((cheat) => cheat.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};