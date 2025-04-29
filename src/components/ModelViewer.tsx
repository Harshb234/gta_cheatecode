import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelViewerProps {
  modelPath: string;
  scale?: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
  backgroundColor?: string;
}

const Model = ({ modelPath, scale = 1, rotation = [0, 0, 0], position = [0, 0, 0] }: ModelViewerProps) => {
  const { scene } = useGLTF(modelPath);
  
  useEffect(() => {
    // Apply some default material properties to enhance appearance
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          child.material.needsUpdate = true;
          
          // Enhance materials
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.envMapIntensity = 1.5;
            child.material.roughness = Math.min(0.8, child.material.roughness);
            child.material.metalness = Math.max(0.2, child.material.metalness);
          }
        }
      }
    });
    
    return () => {
      // Clean up resources
    };
  }, [scene]);
  
  return (
    <primitive 
      object={scene} 
      scale={scale} 
      rotation={new THREE.Euler(...rotation)} 
      position={position} 
    />
  );
};

const ModelViewer: React.FC<ModelViewerProps> = ({ 
  modelPath, 
  scale = 1, 
  rotation = [0, 0, 0], 
  position = [0, 0, 0],
  backgroundColor = '#111'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Start loading state
    setIsLoading(true);
    
    // Clean up loading state when component unmounts
    return () => {
      setIsLoading(false);
    };
  }, []);
  
  const handleModelLoad = () => {
    setIsLoading(false);
  };
  
  return (
    <div ref={containerRef} className="model-viewer">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
          <div className="text-white">
            <div className="w-8 h-8 border-t-2 border-r-2 border-primary rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-center">Loading 3D model...</p>
          </div>
        </div>
      )}
      
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 5], fov: 45 }}
        onCreated={handleModelLoad}
      >
        <color attach="background" args={[backgroundColor]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        <directionalLight position={[0, -5, 0]} intensity={0.2} />
        
        {/* Model with presentation controls for touch-friendly interaction */}
        <PresentationControls
          global
          snap
          rotation={[0, -Math.PI / 4, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Model 
            modelPath={modelPath} 
            scale={scale} 
            rotation={rotation} 
            position={position}
          />
        </PresentationControls>
        
        {/* Orbit controls for mouse interaction */}
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
          minDistance={2}
          maxDistance={10}
        />
        
        {/* Grid helper */}
        <gridHelper args={[10, 10, '#555', '#333']} rotation={[0, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;