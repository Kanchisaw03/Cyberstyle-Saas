import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';

export default function ParticlesBackground() {
  const ref = useRef();
  // Reduced particle count from 5000 to 2000
  const [sphere] = useState(() => random.inSphere(new Float32Array(2000), { radius: 1.5 }));
  
  // Create a grid of points for the cyber grid with reduced density
  const gridPoints = useMemo(() => {
    const points = [];
    const gridSize = 10; // Reduced from 20
    const spacing = 0.4; // Increased from 0.2 to reduce density
    
    for (let x = -gridSize / 2; x < gridSize / 2; x++) {
      for (let z = -gridSize / 2; z < gridSize / 2; z++) {
        points.push(x * spacing, -0.8, z * spacing);
      }
    }
    
    return new Float32Array(points);
  }, []);
  
  const gridRef = useRef();
  const lastUpdateTime = useRef(0);
  
  // Throttled animation frame to reduce CPU usage
  useFrame((state, delta) => {
    // Only update every other frame
    if (state.clock.getElapsedTime() - lastUpdateTime.current < 0.03) return;
    lastUpdateTime.current = state.clock.getElapsedTime();
    
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // Animate grid with reduced frequency
    if (gridRef.current) {
      gridRef.current.rotation.y += delta / 5;
      
      // Pulse effect with reduced frequency
      const time = state.clock.getElapsedTime();
      gridRef.current.material.size = THREE.MathUtils.lerp(
        0.005, 
        0.015, 
        (Math.sin(time) + 1) / 2 // Reduced frequency from time*2 to time
      );
    }
  });

  // Memoize the entire render output to prevent unnecessary re-renders
  return useMemo(() => (
    <group>
      {/* Main particle cloud */}
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={true}>
        <PointMaterial 
          transparent
          color="#00f0ff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* Cyber grid */}
      <Points ref={gridRef} positions={gridPoints} stride={3} frustumCulled={true}>
        <PointMaterial 
          transparent
          color="#ff2a6d"
          size={0.01}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* Connecting lines effect */}
      <LineNetwork />
    </group>
  ), [sphere, gridPoints]); // Dependencies array ensures this only re-renders when these values change
}

// Component to create a network of connecting lines
function LineNetwork() {
  const linesRef = useRef();
  const pointsCount = 20; // Reduced from 50 to improve performance
  const lastUpdateTime = useRef(0);
  
  // Generate random points
  const points = useMemo(() => {
    // Create a properly initialized Float32Array
    const arr = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 3;
    }
    return arr;
  }, []);
  
  // Create connections between points
  const connections = useMemo(() => {
    const lines = [];
    const threshold = 0.8; // Increased from 0.7 to reduce number of connections
    
    for (let i = 0; i < pointsCount; i++) {
      const p1 = new THREE.Vector3(
        points[i * 3],
        points[i * 3 + 1],
        points[i * 3 + 2]
      );
      
      // Limit connections to nearest neighbors to reduce calculations
      for (let j = i + 1; j < Math.min(i + 5, pointsCount); j++) {
        const p2 = new THREE.Vector3(
          points[j * 3],
          points[j * 3 + 1],
          points[j * 3 + 2]
        );
        
        if (p1.distanceTo(p2) < threshold) {
          lines.push(p1.x, p1.y, p1.z);
          lines.push(p2.x, p2.y, p2.z);
        }
      }
    }
    
    return new Float32Array(lines);
  }, [points]);
  
  // Create geometry and material
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(connections, 3));
    return geometry;
  }, [connections]);
  
  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({ 
      color: '#8338ec',
      transparent: true,
      opacity: 0.4
    });
  }, []);
  
  // Throttled animation frame
  useFrame((state) => {
    // Only update every 3 frames
    if (state.clock.getElapsedTime() - lastUpdateTime.current < 0.05) return;
    lastUpdateTime.current = state.clock.getElapsedTime();
    
    if (linesRef.current) {
      const time = state.clock.getElapsedTime();
      linesRef.current.rotation.y = time / 20; // Slowed down from /10 to /20
      linesRef.current.rotation.z = time / 30; // Slowed down from /15 to /30
      
      // Pulse opacity with reduced frequency
      linesRef.current.material.opacity = THREE.MathUtils.lerp(
        0.2, 
        0.4, // Reduced max opacity from 0.5 to 0.4
        (Math.sin(time / 2) + 1) / 2 // Slowed down animation
      );
    }
  });
  
  // Memoize the primitive to prevent unnecessary re-creation
  const primitive = useMemo(() => {
    return new THREE.LineSegments(lineGeometry, lineMaterial);
  }, [lineGeometry, lineMaterial]);

  return (
    <primitive 
      ref={linesRef}
      object={primitive}
    />
  );
}
