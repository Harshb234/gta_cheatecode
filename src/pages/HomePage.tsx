import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Gamepad2, Database, Shield } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="relative gta-container py-20">
          <div className="max-w-3xl">
            <h1 className="gta-heading mb-6">
              <span className="block text-primary">GTA V</span>
              <span className="block text-white">CHEAT CODES</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Master Los Santos with the ultimate collection of cheat codes.
              Weapons, vehicles, abilities - all at your fingertips.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/cheats" className="gta-button">
                View All Cheats
                <ChevronRight className="ml-2" />
              </Link>
              
              <Link 
                to="/about" 
                className="gta-button bg-white/5 border-white/20 
                           hover:bg-white/10 hover:border-white/30"
              >
                Learn More
                <ChevronRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="gta-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Database className="w-12 h-12 text-primary" />}
            title="Complete Database"
            description="Access every cheat code for GTA V across all platforms - PC, PlayStation, and Xbox."
          />
          
          <FeatureCard
            icon={<Gamepad2 className="w-12 h-12 text-primary" />}
            title="Platform Specific"
            description="Get the exact button combinations and keyboard inputs for your gaming platform."
          />
          
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-primary" />}
            title="Save Favorites"
            description="Bookmark your most-used cheats for quick access during gameplay."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface py-20">
        <div className="gta-container text-center">
          <h2 className="gta-heading mb-6">
            Ready to Rule Los Santos?
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            From spawning supercars to becoming invincible,
            unlock the full potential of GTA V with our comprehensive cheat code collection.
          </p>
          
          <Link to="/cheats" className="gta-button text-lg">
            Explore All Cheat Codes
            <ChevronRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="gta-card text-center">
    <div className="inline-block p-4 bg-primary/10 rounded-lg mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default HomePage;