import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ParticlesBackground from './components/ParticlesBackground';
import CyberpunkAnimations from './components/CyberpunkAnimations';
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import CTA from "./sections/CTA";

export default function App() {
  // Refs for scrolling effects
  const containerRef = useRef(null);
  
  // State for cursor position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for cursor effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Add matrix code rain effect to the CSS
  useEffect(() => {
    // Add matrix rain styles
    const style = document.createElement('style');
    style.textContent = `
      .matrix-rain {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
      }
      
      .matrix-column {
        position: absolute;
        top: -100%;
        width: 1px;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(0, 240, 255, 0),
          rgba(0, 240, 255, 0.5),
          rgba(0, 240, 255, 0)
        );
        animation: matrix-fall linear infinite;
      }
      
      .matrix-column span {
        position: absolute;
        color: rgba(0, 240, 255, 0.8);
        font-family: monospace;
        font-size: 1.2rem;
        text-shadow: 0 0 5px rgba(0, 240, 255, 0.5);
        animation: matrix-flicker ease infinite alternate;
      }
      
      @keyframes matrix-fall {
        0% {
          transform: translateY(-100%);
        }
        100% {
          transform: translateY(100%);
        }
      }
      
      @keyframes matrix-flicker {
        0% {
          opacity: 0.3;
        }
        100% {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Create matrix rain effect
    const createMatrixRain = () => {
      const matrixRain = document.createElement('div');
      matrixRain.className = 'matrix-rain';
      document.body.appendChild(matrixRain);
      
      const width = window.innerWidth;
      const columnCount = Math.floor(width / 20);
      
      for (let i = 0; i < columnCount; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 20 + Math.random() * 10}px`;
        column.style.animationDuration = `${5 + Math.random() * 10}s`;
        
        const charCount = Math.floor(Math.random() * 20) + 10;
        for (let j = 0; j < charCount; j++) {
          const char = document.createElement('span');
          char.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);
          char.style.top = `${j * 20}px`;
          char.style.animationDuration = `${0.5 + Math.random()}s`;
          column.appendChild(char);
        }
        
        matrixRain.appendChild(column);
      }
      
      return matrixRain;
    };
    
    const matrixRain = createMatrixRain();
    
    return () => {
      document.body.removeChild(matrixRain);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080d27]" ref={containerRef}>
      {/* Cyberpunk Animations Component */}
      <CyberpunkAnimations mousePosition={mousePosition} />
      
      {/* Full-screen Three.js background */}
      <Canvas className="fixed top-0 left-0 w-full h-full z-0">
        <ParticlesBackground />
      </Canvas>
      
      {/* Scanline overlay effect */}
      <div className="fixed inset-0 pointer-events-none z-[60] scanline"></div>
      
      {/* Circuit background overlay */}
      <div className="fixed inset-0 pointer-events-none z-[5] circuit-bg opacity-10"></div>
      
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full"
      >
        <Navbar />
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
        
        {/* Cyberpunk footer */}
        <footer className="relative bg-[#080d27]/80 backdrop-blur-md border-t border-[#00f0ff]/20 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="cyber-divider mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-orbitron text-white mb-4 neon-text">NEURO.SYNC</h3>
                <p className="text-gray-400 text-sm">
                  The next generation AI productivity interface for enhanced cognitive performance.
                </p>
              </div>
              
              <div>
                <h4 className="text-[#00f0ff] font-medium mb-4">NEURAL LINKS</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-[#00f0ff] transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#00f0ff] transition-colors">API Reference</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#00f0ff] transition-colors">Status</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#00f0ff] transition-colors">Changelog</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-[#00f0ff] font-medium mb-4">SYSTEM STATUS</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Main Server</span>
                    <span className="text-[#00f0ff]">Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Neural Network</span>
                    <span className="text-[#00f0ff]">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">API Gateway</span>
                    <span className="text-[#ff2a6d]">Maintenance</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="cyber-divider my-8"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                &copy; 2025 NEURO.SYNC. All neural pathways reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-[#00f0ff]">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00f0ff]">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00f0ff]">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
      
      {/* Floating AI orb that follows cursor */}
      <div 
        className="ai-orb fixed pointer-events-none z-50"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="orb-inner"></div>
      </div>
      
      {/* Electric trail effect */}
      <div 
        className="electric-trail fixed pointer-events-none z-40"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
      
      {/* Glitch overlay for cyberpunk effect */}
      <div className="glitch-overlay fixed inset-0 pointer-events-none z-200"></div>
    </div>
  );
}
