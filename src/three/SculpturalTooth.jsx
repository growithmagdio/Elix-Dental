import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SculpturalTooth({ targetRotation = { x: 0, y: 0, z: 0 }, scrollProgress = 0 }) {
  const groupRef = useRef();
  const toothMeshRef = useRef();
  const goldRingRef = useRef();
  const goldRing2Ref = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Gentle auto-rotation
    const time = state.clock.getElapsedTime();
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;

    // Target rotation interpolation
    const destY = targetRotation.y + time * 0.2 + mouseX;
    const destX = targetRotation.x + Math.sin(time * 0.5) * 0.1 + mouseY;
    const destZ = targetRotation.z;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, destY, delta * 2);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, destX, delta * 2);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, destZ, delta * 2);

    // Floating gold ring counter-spin
    if (goldRingRef.current) {
      goldRingRef.current.rotation.x = time * 0.4;
      goldRingRef.current.rotation.z = time * 0.3;
    }
    if (goldRing2Ref.current) {
      goldRing2Ref.current.rotation.y = -time * 0.3;
      goldRing2Ref.current.rotation.z = time * 0.2;
    }

    // Scroll scale & position drift
    const targetScale = 1 + scrollProgress * 0.15;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 3)
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Abstract Ceramic Pearl Tooth Sculpture */}
      <group ref={toothMeshRef} scale={[1.4, 1.4, 1.4]}>
        {/* Crown Upper Lobes */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.7, 0.85, 0.7, 32]} />
          <meshPhysicalMaterial
            color="#FCF9F3"
            roughness={0.12}
            metalness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            transmission={0.25}
            thickness={0.8}
            ior={1.52}
            reflectivity={0.9}
            specularIntensity={1.0}
          />
        </mesh>

        {/* Cusp Cushion Top */}
        <mesh position={[0, 0.75, 0]}>
          <torusGeometry args={[0.45, 0.25, 24, 48]} />
          <meshPhysicalMaterial
            color="#FFFDF9"
            roughness={0.1}
            clearcoat={1.0}
            transmission={0.3}
            thickness={0.5}
          />
        </mesh>

        {/* Tapered Root Stem */}
        <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.75, 1.1, 32]} />
          <meshPhysicalMaterial
            color="#F3ECE0"
            roughness={0.2}
            clearcoat={0.8}
            transmission={0.15}
          />
        </mesh>
      </group>

      {/* Primary Floating Thin Gold Ring */}
      <group ref={goldRingRef} scale={[2.3, 2.3, 2.3]}>
        <mesh>
          <torusGeometry args={[1, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#B8975A"
            metalness={0.95}
            roughness={0.15}
            emissive="#B8975A"
            emissiveIntensity={0.15}
          />
        </mesh>
      </group>

      {/* Secondary Orbital Gold Hairline Ring */}
      <group ref={goldRing2Ref} scale={[2.7, 2.7, 2.7]}>
        <mesh>
          <torusGeometry args={[1, 0.008, 16, 100]} />
          <meshStandardMaterial
            color="#E6D5B8"
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </group>
  );
}
