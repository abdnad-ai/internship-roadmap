"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function DriftingShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06;
      meshRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 0]} />
      <meshBasicMaterial color="#b8443c" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

export default function AmbientOrb() {
  return (
    <motion.div
      initial={{ x: "35vw" }}
      animate={{ x: "-35vw" }}
      transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        marginTop: "-350px",
        marginLeft: "-350px",
        width: "700px",
        height: "700px",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <DriftingShape />
      </Canvas>
    </motion.div>
  );
} 