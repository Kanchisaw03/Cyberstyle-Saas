import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

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

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#080d27] to-black pt-20">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#8338ec]/10 to-[#ff2a6d]/10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,transparent_70%)]" />
      </motion.div>

      {/* Circuit grid background */}
      <div className="absolute inset-0 z-0 opacity-30 circuit-bg"></div>
      
      {/* Scanline effect */}
      <div className="scanline"></div>

      {/* Matrix code rain effect in background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <MatrixRain />
      </div>

      {/* Floating neon orbs */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00f0ff]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#ff2a6d]/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/3 w-32 h-32 bg-[#8338ec]/20 rounded-full blur-2xl"
      />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left side content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block"
            >
              <span className="cyber-badge">AI-POWERED</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-7xl font-black"
              data-text="NEURO.SYNC"
            >
              <span className="neon-text-flicker">NEURO</span>
              <span className="text-[#00f0ff]">.</span>
              <span className="chrome-text">SYNC</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-300 max-w-xl"
            >
              The next-gen AI productivity interface that <span className="neon-text">augments your cognitive workflow</span> and <span className="text-[#ff2a6d]">optimizes neural pathways</span> for enhanced performance.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button className="cyber-button-primary px-8 py-4 rounded-md">
              LAUNCH DEMO
            </button>
            <button className="cyber-button px-8 py-4 rounded-md">
              NEURAL SPECS
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <div className="cyber-progress w-64">
              <div className="cyber-progress-bar w-[75%]"></div>
            </div>
            <span className="text-sm text-[#00f0ff]">SYSTEM ONLINE</span>
          </motion.div>
        </motion.div>
        
        {/* Right side 3D holographic interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="w-full lg:w-1/2 aspect-square max-w-[500px]"
        >
          <div className="relative w-full h-full">
            {/* Holographic container */}
            <div className="absolute inset-0 hologram rounded-full overflow-hidden border border-[#00f0ff]/30">
              <HolographicInterface />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-5 -left-5 w-10 h-10 border-t-2 border-l-2 border-[#00f0ff]"></div>
            <div className="absolute -bottom-5 -right-5 w-10 h-10 border-b-2 border-r-2 border-[#00f0ff]"></div>
            <div className="absolute top-1/2 -left-2 w-4 h-4 bg-[#00f0ff] rounded-full blur-[2px]"></div>
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-[#00f0ff] rounded-full blur-[2px]"></div>
            
            {/* Data points */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 bg-[#00f0ff] rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  boxShadow: '0 0 10px #00f0ff',
                  animation: `pulse ${Math.random() * 2 + 2}s infinite`
                }}
              ></div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom data panel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="cyber-terminal text-xs sm:text-sm flex flex-wrap justify-between items-center gap-4 rounded-md">
            <div>STATUS: <span className="text-[#00f0ff]">ACTIVE</span></div>
            <div>CPU: <span className="text-[#00f0ff]">87.3%</span></div>
            <div>MEMORY: <span className="text-[#00f0ff]">12.8TB</span></div>
            <div>UPTIME: <span className="text-[#00f0ff]">1243:59:01</span></div>
            <div>NEURAL LINKS: <span className="text-[#00f0ff]">CONNECTED</span></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;