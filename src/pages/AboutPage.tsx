import React from 'react';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';
import { Check, Info, AlertTriangle, HelpCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <PageHeader 
        title="About GTA 5 Cheat Hub"
        subtitle="Learn how to use cheats and make the most of our resources"
      />
      
      <div className="space-y-8">
        <section className="card">
          <h2 className="text-2xl font-heading text-primary mb-4">What is this site?</h2>
          <p className="text-gray-300 mb-4">
            GTA 5 Cheat Hub is your comprehensive resource for all cheat codes in Grand Theft Auto V.
            We've compiled a complete database of cheats for all platforms (PC, PlayStation, and Xbox)
            with easy search and filtering. Our interactive 3D models help you visualize iconic GTA elements.
          </p>
          <p className="text-gray-300">
            This site is designed for GTA 5 players of all skill levels who want to enhance their
            gameplay experience with cheat codes and explore the rich world of Los Santos.
          </p>
        </section>
        
        <section className="card">
          <h2 className="text-2xl font-heading text-secondary mb-4">How to Use Cheat Codes</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-accent mb-2">PC Instructions</h3>
            <p className="text-gray-300 mb-2">
              To use cheat codes on PC, you need to either:
            </p>
            <ol className="list-decimal pl-5 text-gray-300 space-y-1">
              <li>Press the <code className="bg-black p-1 rounded">~</code> key to open the console and type the cheat</li>
              <li>Or type the key sequence directly while in-game</li>
            </ol>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-accent mb-2">PlayStation Instructions</h3>
            <p className="text-gray-300 mb-2">
              To use cheat codes on PlayStation:
            </p>
            <ol className="list-decimal pl-5 text-gray-300 space-y-1">
              <li>Press the button combinations in sequence as shown</li>
              <li>You must enter the entire sequence correctly without pausing</li>
              <li>You don't need to press enter or confirm after the sequence</li>
            </ol>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-accent mb-2">Xbox Instructions</h3>
            <p className="text-gray-300 mb-2">
              To use cheat codes on Xbox:
            </p>
            <ol className="list-decimal pl-5 text-gray-300 space-y-1">
              <li>Press the button combinations in sequence as shown</li>
              <li>You must enter the entire sequence correctly without pausing</li>
              <li>You don't need to press enter or confirm after the sequence</li>
            </ol>
          </div>
        </section>
        
        <section className="card">
          <h2 className="text-2xl font-heading text-primary mb-4">Important Notes</h2>
          
          <div className="space-y-4">
            <InfoItem 
              icon={<AlertTriangle className="h-6 w-6 text-warning" />}
              title="Disable Achievements/Trophies"
              description="Using cheat codes will disable achievements and trophies for your current game session. Save before using cheats!"
            />
            
            <InfoItem 
              icon={<Info className="h-6 w-6 text-primary" />}
              title="Persistence"
              description="Most cheat effects will deactivate if you save the game. Some cheats need to be reactivated after dying or starting a new mission."
            />
            
            <InfoItem 
              icon={<Check className="h-6 w-6 text-success" />}
              title="Compatible Missions"
              description="Some cheats may interfere with mission progress. If you encounter issues, deactivate cheats before continuing missions."
            />
            
            <InfoItem 
              icon={<HelpCircle className="h-6 w-6 text-secondary" />}
              title="Need Help?"
              description="If you're having trouble with a particular cheat, check our detailed instructions or try the alternatives listed."
            />
          </div>
        </section>
        
        <div className="bg-card p-6 rounded-lg text-center">
          <h2 className="text-2xl font-heading text-accent mb-4">Ready to Try Some Cheats?</h2>
          <Link to="/cheats" className="gta-button inline-block">
            Explore All Cheat Codes
          </Link>
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, title, description }) => (
  <div className="flex items-start">
    <div className="mr-4 mt-1">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

export default AboutPage;