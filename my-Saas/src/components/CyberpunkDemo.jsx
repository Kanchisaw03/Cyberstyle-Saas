import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import CyberpunkAnimations, { useMagneticEffect, useTypingEffect } from './CyberpunkAnimations';

// 3D Holographic Interface Component
const HolographicInterface = () => {
  return (
    <Canvas className="hologram-canvas">
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <CyberSphere />
      <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} />
      <Environment preset="city" />
    </Canvas>
  );
};

// 3D Cyber Sphere
const CyberSphere = () => {
  const mesh = useRef();
  
  useEffect(() => {
    if (!mesh.current) return;
    
    const geometry = mesh.current.geometry;
    const position = geometry.attributes.position;
    
    // Modify vertices for cyber effect
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      
      // Add some distortion
      position.setXYZ(
        i,
        x + Math.sin(y * 2) * 0.05,
        y + Math.sin(z * 2) * 0.05,
        z + Math.sin(x * 2) * 0.05
      );
    }
    
    position.needsUpdate = true;
  }, []);
  
  return (
    <mesh ref={mesh} rotation={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#00f0ff" 
        emissive="#00f0ff"
        emissiveIntensity={0.5}
        wireframe={true} 
      />
    </mesh>
  );
};

// Matrix Code Rain Effect
const MatrixRain = () => {
  return (
    <div className="matrix-rain">
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i} 
          className="matrix-column"
          style={{ 
            left: `${i * 5}%`, 
            animationDuration: `${Math.random() * 5 + 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          {Array.from({ length: 25 }).map((_, j) => (
            <span 
              key={j}
              style={{ 
                animationDuration: `${Math.random() * 2 + 1}s`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.5 + 0.5
              }}
            >
              {String.fromCharCode(Math.floor(Math.random() * 74) + 48)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function CyberpunkDemo() {
  const [scrollY, setScrollY] = useState(0);
  const magneticButtonRef = useRef(null);
  const terminalTextRef = useRef(null);
  
  // Use the magnetic effect hook
  useMagneticEffect(magneticButtonRef, 0.5, 200);
  
  // Use the typing effect hook
  useTypingEffect(terminalTextRef, "Initializing neural interface... System online. Welcome to the cybernetic realm.", 50);
  
  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="relative min-h-screen bg-[#080d27] overflow-hidden">
      {/* Activate all the cyberpunk animations */}
      <CyberpunkAnimations />
      
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-30 circuit-bg"></div>
      <div className="scanline"></div>
      <div className="absolute inset-0 z-0 opacity-10">
        <MatrixRain />
      </div>
      
      {/* Cityscape parallax background */}
      <div className="cityscape-parallax">
        <div className="cityscape-layer cityscape-layer-1" style={{ transform: `translateY(${scrollY * 0.05}px)` }}></div>
        <div className="cityscape-layer cityscape-layer-2" style={{ transform: `translateY(${scrollY * 0.1}px)` }}></div>
        <div className="cityscape-layer cityscape-layer-3" style={{ transform: `translateY(${scrollY * 0.15}px)` }}></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <header className="mb-20">
          <h1 
            className="text-6xl font-bold text-center enhanced-glitch-text mb-4" 
            data-text="CYBERPUNK UI"
          >
            CYBERPUNK UI
          </h1>
          <p className="text-[#00f0ff] text-center text-xl">Advanced Animation Effects</p>
        </header>
        
        {/* Parallax container demo */}
        <div className="parallax-container mb-20 p-10 rounded-lg cyber-panel">
          <h2 className="text-3xl font-bold mb-6 neon-text">3D Parallax Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="parallax-layer parallax-layer-1 p-6 cyber-card-pulse data-pulse">
              <h3 className="text-xl font-bold mb-2 text-[#00f0ff]">Layer 1</h3>
              <p>Move your cursor to see the parallax effect in action.</p>
            </div>
            <div className="parallax-layer parallax-layer-2 p-6 cyber-card-pulse">
              <h3 className="text-xl font-bold mb-2 text-[#8338ec]">Layer 2</h3>
              <p>Each layer moves at a different depth.</p>
            </div>
            <div className="parallax-layer parallax-layer-3 p-6 cyber-card-pulse">
              <h3 className="text-xl font-bold mb-2 text-[#ff2a6d]">Layer 3</h3>
              <p>Creates a 3D holographic effect.</p>
            </div>
          </div>
        </div>
        
        {/* Glitch hover effects */}
        <div className="mb-20 p-10 rounded-lg cyber-panel ambient-scanline">
          <h2 className="text-3xl font-bold mb-6 neon-text">Glitch Hover Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 cyber-card-pulse">
              <h3 
                className="text-xl font-bold mb-2 glitch-hover" 
                data-text="Hover Me"
              >
                Hover Me
              </h3>
              <p>Simple glitch effect on hover.</p>
            </div>
            <div className="p-6 cyber-card-pulse">
              <h3 
                className="text-xl font-bold mb-2 enhanced-glitch-text" 
                data-text="Glitch Text"
              >
                Glitch Text
              </h3>
              <p>Enhanced glitch with color separation.</p>
            </div>
            <div className="p-6 cyber-card-pulse">
              <h3 className="text-xl font-bold mb-2 neon-text-flicker">Flicker Text</h3>
              <p>Neon sign flicker effect.</p>
            </div>
          </div>
        </div>
        
        {/* Button effects */}
        <div className="mb-20 p-10 rounded-lg cyber-panel">
          <h2 className="text-3xl font-bold mb-6 neon-text">Button Effects</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <button className="cyber-button px-8 py-4 rounded-md">
              Standard Button
            </button>
            <button className="cyber-button-primary px-8 py-4 rounded-md neon-ripple">
              Ripple Effect
            </button>
            <button 
              ref={magneticButtonRef} 
              className="cyber-button-ripple px-8 py-4 rounded-md magnetic"
            >
              Magnetic Button
            </button>
            <button className="cyber-button px-8 py-4 rounded-md rotate-3d">
              3D Rotation
            </button>
          </div>
        </div>
        
        {/* Terminal text effect */}
        <div className="mb-20 p-10 rounded-lg cyber-terminal">
          <h2 className="text-3xl font-bold mb-6 text-[#00f0ff]">Terminal Effects</h2>
          <div className="terminal-text mb-4">System diagnostics: All systems nominal</div>
          <div className="terminal-text mb-4">Neural network: Active</div>
          <div ref={terminalTextRef} className="terminal-text typing"></div>
        </div>
        
        {/* Holographic interface */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-6 neon-text text-center">Holographic Interface</h2>
          <div className="w-full max-w-md mx-auto aspect-square">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 hologram rounded-full overflow-hidden border border-[#00f0ff]/30">
                <HolographicInterface />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-5 -left-5 w-10 h-10 border-t-2 border-l-2 border-[#00f0ff]"></div>
              <div className="absolute -bottom-5 -right-5 w-10 h-10 border-b-2 border-r-2 border-[#00f0ff]"></div>
              <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#00f0ff] rounded-full blur-[2px]"></div>
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#00f0ff] rounded-full blur-[2px]"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll-triggered sections */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 neon-text text-center">Scroll Effects</h2>
          
          <div className="space-y-40">
            {/* These sections will fade in as you scroll */}
            <div className="fade-in-section p-10 rounded-lg cyber-panel">
              <h3 className="text-2xl font-bold mb-4 text-[#00f0ff]">Fade In Section 1</h3>
              <p>This section fades in as you scroll down to it.</p>
            </div>
            
            <div className="fade-in-section p-10 rounded-lg cyber-panel">
              <h3 className="text-2xl font-bold mb-4 text-[#8338ec]">Fade In Section 2</h3>
              <p>Each section triggers independently.</p>
            </div>
            
            <div className="fade-in-section p-10 rounded-lg cyber-panel">
              <h3 className="text-2xl font-bold mb-4 text-[#ff2a6d]">Fade In Section 3</h3>
              <p>Scroll-triggered animations create a dynamic experience.</p>
            </div>
          </div>
        </div>
        
        {/* Circuit connections */}
        <div className="mb-20 relative">
          <h2 className="text-3xl font-bold mb-10 neon-text text-center">Circuit Connections</h2>
          
          <svg className="w-full h-[300px]" viewBox="0 0 1000 300">
            <path 
              className="circuit-connect" 
              d="M100,150 C200,50 300,250 400,150 C500,50 600,250 700,150 C800,50 900,250 900,150" 
              fill="none" 
            />
            <circle cx="100" cy="150" r="10" fill="#00f0ff" />
            <circle cx="400" cy="150" r="10" fill="#00f0ff" />
            <circle cx="700" cy="150" r="10" fill="#00f0ff" />
            <circle cx="900" cy="150" r="10" fill="#00f0ff" />
          </svg>
        </div>
        
        {/* Data cards with pulse effect */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 neon-text text-center">Data Pulse Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="cyber-card-pulse data-pulse p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-[#00f0ff]">Neural Network</h3>
              <div className="cyber-progress mb-2">
                <div className="cyber-progress-bar w-[85%]"></div>
              </div>
              <p>Processing power: 85%</p>
            </div>
            
            <div className="cyber-card-pulse data-pulse p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-[#8338ec]">Quantum Core</h3>
              <div className="cyber-progress mb-2">
                <div className="cyber-progress-bar w-[65%]"></div>
              </div>
              <p>Stability: 65%</p>
            </div>
            
            <div className="cyber-card-pulse data-pulse p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-[#ff2a6d]">Security Protocol</h3>
              <div className="cyber-progress mb-2">
                <div className="cyber-progress-bar w-[95%]"></div>
              </div>
              <p>Integrity: 95%</p>
            </div>
          </div>
        </div>
        
        <footer className="text-center text-[#00f0ff] py-10">
          <p>Hover over elements, move your cursor around, and scroll to see all effects in action.</p>
          <p className="mt-2">The AI orb follows your cursor with magnetic drag physics.</p>
        </footer>
      </div>
    </div>
  );
}
