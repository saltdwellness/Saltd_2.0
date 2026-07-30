'use client';
import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Center, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { SaltdStick } from './SaltdStick';

/** Loads a real .glb sachet and applies the same scroll spin / idle rotation. */
function GLBStick({ path, spin, idle }: { path: string; spin: number; idle: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(path);
  const model = useMemo(() => scene.clone(), [scene]);

  useFrame((_, d) => {
    if (!ref.current) return;
    if (idle) ref.current.rotation.y += d * 0.4;
    else ref.current.rotation.y += (spin - ref.current.rotation.y) * Math.min(d * 6, 1);
  });

  return (
    <Center>
      <group ref={ref}>
        <primitive object={model} />
      </group>
    </Center>
  );
}

/**
 * Scroll-driven hero stick: rotates up to 180° and zooms out as `progress` 0→1.
 * Pass `model` (a /models/*.glb path) to use a real 3D sachet; otherwise the
 * procedural placeholder stick is used.
 */
export default function StickScene({
  flavour,
  progress = 0,
  idle = false,
  startAt = 0,
  model,
  modelScale = 1.45,
}: {
  flavour?: string;
  progress?: number;
  idle?: boolean;
  startAt?: number;
  model?: string;
  modelScale?: number;
}) {
  // scroll-driven: spin begins at `startAt` (0 = from start, 0.5 = halfway), then rotates 180° + zooms out.
  const p = Math.max(0, (progress - startAt) / (1 - startAt));
  const spin = idle ? 0 : Math.min(p / 0.7, 1) * Math.PI;
  const zoom = idle ? 1 : 1 - Math.min(p, 1) * 0.45;

  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 30 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={2.4} />
      <directionalLight position={[-5, 1, -3]} intensity={1.6} color="#2E5BFF" />
      <Suspense fallback={null}>
        {model ? (
          <group scale={zoom * modelScale}>
            <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5}>
              <GLBStick path={model} spin={spin} idle={idle} />
            </Float>
          </group>
        ) : (
          <group scale={zoom * 1.08}>
            <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5}>
              <SaltdStick flavour={flavour} scrollSpin={spin} idle={idle} />
            </Float>
          </group>
        )}
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
