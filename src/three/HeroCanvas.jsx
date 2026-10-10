import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Preload } from '@react-three/drei';
import SculpturalTooth from './SculpturalTooth';
import FloatingDust from './FloatingDust';

export default function HeroCanvas({ targetRotation, scrollProgress = 0 }) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const checkMotion = () => {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMobile();
    checkMotion();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: isMobile ? 50 : 45 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#0B1420']} />

        {/* Studio & Gold Rim Lighting */}
        <ambientLight intensity={0.6} />
        {/* Key Warm Studio Light */}
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#FFF5E6" castShadow />
        {/* Soft Fill Light */}
        <directionalLight position={[-5, -2, -3]} intensity={0.7} color="#D4C3A3" />
        {/* Soft Antique Gold Rim Light */}
        <pointLight position={[0, 4, -4]} intensity={3.5} color="#B8975A" distance={15} />
        {/* Bottom Gold Ambient Reflection */}
        <pointLight position={[0, -4, 3]} intensity={1.2} color="#E6D5B8" distance={10} />

        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.8} />

          {!reducedMotion ? (
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
              <SculpturalTooth targetRotation={targetRotation} scrollProgress={scrollProgress} />
            </Float>
          ) : (
            <SculpturalTooth targetRotation={{ x: 0, y: 0, z: 0 }} scrollProgress={0} />
          )}

          {!isMobile && <FloatingDust count={isMobile ? 30 : 70} />}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
