import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import ModelViewer from '../components/ModelViewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { useLoading } from '../contexts/LoadingContext';

// Model data
const models = [
  {
    id: 'car',
    name: 'Sports Car',
    description: 'A high-performance sports car inspired by GTA\'s supercars.',
    path: 'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/ferrari-f50/model.gltf',
    scale: 0.01,
    rotation: [0, Math.PI / 2, 0],
    position: [0, -1, 0],
    background: '#111',
  },
  {
    id: 'weapon',
    name: 'Combat Pistol',
    description: 'A powerful handgun, perfect for any situation in Los Santos.',
    path: 'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/glock/model.gltf',
    scale: 4,
    rotation: [0, Math.PI / 2, 0],
    position: [0, 0, 0],
    background: '#111',
  },
  {
    id: 'cityscape',
    name: 'City Building',
    description: 'A skyscraper from the heart of Los Santos\' business district.',
    path: 'https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/skyscraper-2/model.gltf',
    scale: 0.05,
    rotation: [0, 0, 0],
    position: [0, -1.5, 0],
    background: '#111',
  },
];

const ModelViewerPage: React.FC = () => {
  const [activeModel, setActiveModel] = useState('car');
  const { startLoading, stopLoading } = useLoading();
  
  const handleModelChange = (modelId: string) => {
    startLoading();
    setActiveModel(modelId);
    // Simulate loading time for model change
    setTimeout(() => {
      stopLoading();
    }, 800);
  };
  
  const currentModel = models.find(model => model.id === activeModel) || models[0];
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <PageHeader 
        title="3D Models Viewer"
        subtitle="Explore iconic GTA 5 models in interactive 3D"
      />
      
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => handleModelChange(model.id)}
              className={`px-4 py-2 font-bold uppercase transition-all duration-300 ${
                activeModel === model.id 
                  ? 'bg-primary text-black' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>
        
        <div className="bg-black rounded-lg overflow-hidden">
          <ModelViewer 
            modelPath={currentModel.path}
            scale={currentModel.scale}
            rotation={currentModel.rotation as [number, number, number]}
            position={currentModel.position as [number, number, number]}
            backgroundColor={currentModel.background}
          />
        </div>
        
        <div className="mt-4 bg-card p-6 rounded-lg">
          <h2 className="text-2xl font-heading text-primary mb-2">{currentModel.name}</h2>
          <p className="text-gray-300">{currentModel.description}</p>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h3 className="text-lg font-bold text-accent mb-2">Interaction Tips:</h3>
            <ul className="text-gray-300 list-disc pl-5 space-y-1">
              <li>Click and drag to rotate the model</li>
              <li>Use mousewheel or pinch gesture to zoom</li>
              <li>Right-click and drag to pan the view</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelViewerPage;