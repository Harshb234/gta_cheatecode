import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (platform: string, category: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [platform, setPlatform] = useState('all');
  const [category, setCategory] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleFilterApply = () => {
    onFilterChange(platform, category);
    setShowFilters(false);
  };

  const handleReset = () => {
    setPlatform('all');
    setCategory('all');
    onFilterChange('all', 'all');
    setShowFilters(false);
  };

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cheat codes..."
          className="gta-input pl-12 pr-20"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                onSearch('');
              }}
              className="p-2 hover:text-primary"
            >
              <X size={20} />
            </button>
          )}
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 ${showFilters ? 'text-primary' : 'hover:text-primary'}`}
          >
            <Filter size={20} />
          </button>
        </div>
      </form>

      {showFilters && (
        <div className="gta-card space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-primary">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="gta-input"
              >
                <option value="all">All Platforms</option>
                <option value="pc">PC</option>
                <option value="ps">PlayStation</option>
                <option value="xbox">Xbox</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-primary">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="gta-input"
              >
                <option value="all">All Categories</option>
                <option value="player">Player</option>
                <option value="vehicle">Vehicle</option>
                <option value="weapon">Weapon</option>
                <option value="wanted">Wanted Level</option>
                <option value="world">World</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="gta-button bg-red-500/20 border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleFilterApply}
              className="gta-button"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;