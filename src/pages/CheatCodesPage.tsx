import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import CheatGrid from '../components/CheatGrid';
import { fetchCheatCodes, searchCheatCodes } from '../services/api';
import { CheatCode } from '../types/CheatCode';
import { useLoading } from '../contexts/LoadingContext';
import { useFavorites } from '../contexts/FavoritesContext';

const CheatCodesPage: React.FC = () => {
  const [allCheats, setAllCheats] = useState<CheatCode[]>([]);
  const [filteredCheats, setFilteredCheats] = useState<CheatCode[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFavorites, setShowFavorites] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const { favorites } = useFavorites();

  // Fetch all cheat codes on component mount
  useEffect(() => {
    const loadCheats = async () => {
      startLoading();
      const cheats = await fetchCheatCodes();
      setAllCheats(cheats);
      setFilteredCheats(cheats);
      stopLoading();
    };

    loadCheats();
  }, [startLoading, stopLoading]);

  // Handle search
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedPlatform, selectedCategory, showFavorites);
  };

  // Handle filter changes
  const handleFilterChange = (platform: string, category: string) => {
    setSelectedPlatform(platform);
    setSelectedCategory(category);
    applyFilters(searchQuery, platform, category, showFavorites);
  };

  // Toggle favorites view
  const toggleFavorites = () => {
    const newShowFavorites = !showFavorites;
    setShowFavorites(newShowFavorites);
    applyFilters(searchQuery, selectedPlatform, selectedCategory, newShowFavorites);
  };

  // Apply all filters and search
  const applyFilters = (query: string, platform: string, category: string, onlyFavorites: boolean) => {
    startLoading();
    
    let results = [...allCheats];
    
    // Apply search if query exists
    if (query) {
      results = results.filter(cheat => 
        cheat.title.toLowerCase().includes(query.toLowerCase()) ||
        cheat.description.toLowerCase().includes(query.toLowerCase()) ||
        cheat.effect.toLowerCase().includes(query.toLowerCase()) ||
        cheat.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    // Apply platform filter
    if (platform !== 'all') {
      results = results.filter(cheat => 
        cheat.platforms[platform as keyof typeof cheat.platforms]
      );
    }
    
    // Apply category filter
    if (category !== 'all') {
      results = results.filter(cheat => 
        cheat.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter favorites if enabled
    if (onlyFavorites) {
      const favoriteIds = favorites.map(fav => fav.id);
      results = results.filter(cheat => favoriteIds.includes(cheat.id));
    }
    
    setFilteredCheats(results);
    stopLoading();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <PageHeader 
        title="GTA 5 Cheat Codes"
        subtitle="Find and save all the cheat codes for Grand Theft Auto V"
      />
      
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
        <SearchBar 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange} 
        />
        
        <button 
          onClick={toggleFavorites}
          className={`gta-button ${showFavorites ? '' : 'secondary'} mb-4 md:mb-0`}
        >
          {showFavorites ? 'Show All Cheats' : 'Show Favorites'}
        </button>
      </div>
      
      <CheatGrid cheats={filteredCheats} />
    </div>
  );
};

export default CheatCodesPage;