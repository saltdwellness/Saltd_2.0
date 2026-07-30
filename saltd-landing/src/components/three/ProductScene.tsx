'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, Center } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Loads a .glb and drives its rotation from a scroll-progress value (0→1).
 * Drop your model at the configured path and this renders it photorealistically.
 */
function Model({ path, progress, spin }: { path: string; progress: number; spin: number }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(path);

  useFrame((_, delta) => {
    if (!ref.current) return;
    // base rotation from scroll + gentle constant idle spin
    const target = progress * spin;
    ref.current.rotation.y += ((target - ref.current.rotation.y) * Math.min(delta * 4, 1));
  });

  return (
    <Center>
      <group ref={ref}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function ProductScene({
  modelPath,
  progress,
  spin = Math.PI * 2,
  scale = 1,
}: {
  modelPath: string;
  progress: number;
  spin?: number;
  scale?: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} />
      <directionalLight position={[-6, 2, -4]} intensity={1.4} color="#2E5BFF" />
      <Suspense fallback={null}>
        <group scale={scale}>
          <Float speed={2} rotationIntensity={0.25} floatIntensity={0.6}>
            <Model path={modelPath} progress={progress} spin={spin} />
          </Float>
        </group>
        <ContactShadows position={[0, -1.6, 0]} opacity={0.4} scale={8} blur={2.5} far={3} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
