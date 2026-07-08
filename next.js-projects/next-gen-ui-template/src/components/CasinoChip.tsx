"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Chip() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[1.5, 1.5, 0.25, 32]} />
        <meshStandardMaterial color="#5c5049" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.02, 32]} />
        <meshStandardMaterial color="#5fa88a" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.13, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.02, 32]} />
        <meshStandardMaterial color="#5fa88a" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function CasinoChip() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 2, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={60} color="#7fc4a6" />
        <pointLight position={[-3, -2, 2]} intensity={30} color="#f5f3ee" />
        <Chip />
      </Canvas>
    </div>
  );
} 