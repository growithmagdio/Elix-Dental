import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingDust({ count = 80 }) {
  const meshRef = useRef();

  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const spe = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      sca[i] = Math.random() * 0.03 + 0.01;
      spe[i] = Math.random() * 0.005 + 0.002;
    }
    return [pos, sca, spe];
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3] + Math.sin(time * 0.3 + i) * 0.3;
      const y = (positions[i * 3 + 1] + time * speeds[i] * 0.8) % 6 - 3;
      const z = positions[i * 3 + 2] + Math.cos(time * 0.2 + i) * 0.2;

      dummy.position.set(x, y, z);
      const scale = scales[i] * (1 + Math.sin(time * 2 + i) * 0.3);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#B8975A"
        emissive="#B8975A"
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}
