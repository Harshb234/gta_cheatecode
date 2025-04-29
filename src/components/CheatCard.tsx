import React from 'react';
import { Star } from 'lucide-react';
import { CheatCode } from '../types/CheatCode';
import { useFavorites } from '../contexts/FavoritesContext';

interface CheatCardProps {
  cheat: CheatCode;
}

const CheatCard: React.FC<CheatCardProps> = ({ cheat }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(cheat.id);

  return (
    <div className="gta-card group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
          {cheat.title}
        </h3>
        <button
          onClick={() => favorite ? removeFavorite(cheat.id) : addFavorite(cheat)}
          className={`p-2 rounded-full transition-all ${
            favorite 
              ? 'bg-primary/20 text-primary' 
              : 'bg-white/5 text-gray-400 hover:bg-primary/20 hover:text-primary'
          }`}
        >
          <Star fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="text-gray-300 mb-4">{cheat.description}</p>

      <div className="bg-black/30 p-4 rounded-lg mb-4">
        <h4 className="text-primary font-bold mb-2">Effect:</h4>
        <p className="text-gray-200">{cheat.effect}</p>
      </div>

      <div className="space-y-3">
        {cheat.platforms.pc && (
          <div className="flex items-center space-x-3">
            <span className="platform-badge platform-pc">PC</span>
            <code className="font-mono text-primary">{cheat.platforms.pc}</code>
          </div>
        )}
        
        {cheat.platforms.ps && (
          <div className="flex items-center space-x-3">
            <span className="platform-badge platform-ps">PS</span>
            <code className="font-mono text-blue-400">{cheat.platforms.ps}</code>
          </div>
        )}
        
        {cheat.platforms.xbox && (
          <div className="flex items-center space-x-3">
            <span className="platform-badge platform-xbox">XBOX</span>
            <code className="font-mono text-green-400">{cheat.platforms.xbox}</code>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex flex-wrap gap-2">
          {cheat.tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheatCard;