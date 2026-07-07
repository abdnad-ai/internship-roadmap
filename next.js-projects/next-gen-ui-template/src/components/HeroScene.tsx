"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RotatingGem() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.08;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y += delta * 0.2;
      wireRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshPhysicalMaterial
          color="#0f0f0d"
          metalness={0.6}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
          envMapIntensity={2.5}
        />
      </mesh>
      <lineSegments ref={wireRef}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.71, 0)]} />
        <lineBasicMaterial color="#2f9d6f" transparent opacity={0.5} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.2} />
        <pointLight position={[-4, 2, 3]} intensity={80} color="#22785a" />
        <pointLight position={[4, -2, 3]} intensity={80} color="#c73838" />
        <pointLight position={[0, 4, -2]} intensity={30} color="#e8e4d8" />
        <RotatingGem />
      </Canvas>
    </div>
  );
}