import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

export default function ParticlesBackground() {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
  
  // Create a grid of points for the cyber grid
  const gridPoints = useMemo(() => {
    const points = [];
    const gridSize = 20;
    const spacing = 0.2;
    
    for (let x = -gridSize / 2; x < gridSize / 2; x++) {
      for (let z = -gridSize / 2; z < gridSize / 2; z++) {
        points.push(x * spacing, -0.8, z * spacing);
      }
    }
    
    return new Float32Array(points);
  }, []);
  
  const gridRef = useRef();
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // Animate grid
    if (gridRef.current) {
      gridRef.current.rotation.y += delta / 5;
      
      // Pulse effect
      const time = state.clock.getElapsedTime();
      gridRef.current.material.size = THREE.MathUtils.lerp(
        0.005, 
        0.015, 
        (Math.sin(time * 2) + 1) / 2
      );
    }
  });

  return (
    <group>
      {/* Main particle cloud */}
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent
          color="#00f0ff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* Cyber grid */}
      <Points ref={gridRef} positions={gridPoints} stride={3} frustumCulled={false}>
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
  );
}

// Component to create a network of connecting lines
function LineNetwork() {
  const linesRef = useRef();
  const pointsCount = 50;
  
  // Generate random points
  const points = useMemo(() => {
    return new Float32Array(pointsCount * 3).map(() => (Math.random() - 0.5) * 3);
  }, []);
  
  // Create connections between points
  const connections = useMemo(() => {
    const lines = [];
    const threshold = 0.7; // Maximum distance for connection
    
    for (let i = 0; i < pointsCount; i++) {
      const p1 = new THREE.Vector3(
        points[i * 3],
        points[i * 3 + 1],
        points[i * 3 + 2]
      );
      
      for (let j = i + 1; j < pointsCount; j++) {
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
  
  useFrame((state) => {
    if (linesRef.current) {
      const time = state.clock.getElapsedTime();
      linesRef.current.rotation.y = time / 10;
      linesRef.current.rotation.z = time / 15;
      
      // Pulse opacity
      linesRef.current.material.opacity = THREE.MathUtils.lerp(
        0.2, 
        0.5, 
        (Math.sin(time) + 1) / 2
      );
    }
  });
  
  return (
    <primitive 
      ref={linesRef}
      object={new THREE.LineSegments(lineGeometry, lineMaterial)} 
    />
  );
}
