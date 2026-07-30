'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SaltdStick } from './SaltdStick';

const LIME = '#2E5BFF';

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const smooth = (a: number, b: number, p: number) => {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/* ---- the animated ritual: open → pour → ice → mix ---- */
function Ritual({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const sachet  = useRef<THREE.Group>(null);
  const liquid  = useRef<THREE.Mesh>(null);
  const stream  = useRef<THREE.Mesh>(null);
  const iceGrp  = useRef<THREE.Group>(null);
  const drink   = useRef<THREE.Group>(null);

  // glass geometry constants
  const GLASS_H = 2.4, GLASS_R = 0.8, INNER_R = 0.72, BOTTOM = -1.2;
  const MAX_FILL = 2.05;

  // ice resting targets inside glass
  const iceTargets = useRef(
    Array.from({ length: 5 }, (_, i) => ({
      x: (Math.random() - 0.5) * 0.7,
      z: (Math.random() - 0.5) * 0.7,
      yRest: BOTTOM + 0.5 + i * 0.28,
      rot: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
      delay: i * 0.08,
    }))
  );

  useFrame((_, delta) => {
    const p = progressRef.current;

    /* phases */
    const openP = smooth(0.02, 0.16, p);          // sachet tilts to pour
    const pourP = smooth(0.16, 0.5, p);           // glass fills
    const iceP  = smooth(0.5, 0.72, p);           // ice drops
    const mixP  = smooth(0.72, 1.0, p);           // swirl

    /* sachet: lift + tilt to pour, then lift away */
    if (sachet.current) {
      const tilt = openP * -2.2;                  // rotate to pour
      const exit = mixP * 1.4;                     // lift away while mixing
      sachet.current.rotation.z = tilt;
      sachet.current.position.set(0.15 + openP * 0.55, 1.85 + exit, 0);
    }

    /* liquid fills */
    if (liquid.current) {
      const h = Math.max(0.0001, MAX_FILL * pourP);
      liquid.current.scale.y = h;
      liquid.current.position.y = BOTTOM + h / 2;
      // gentle swirl while mixing
      liquid.current.rotation.y += delta * (0.3 + mixP * 4);
    }

    /* pour stream visible only mid-pour */
    if (stream.current) {
      const flowing = openP > 0.7 && pourP > 0.02 && pourP < 0.99 ? 1 : 0;
      const mat = stream.current.material as THREE.MeshStandardMaterial;
      mat.opacity += (flowing * 0.85 - mat.opacity) * 0.2;
      stream.current.visible = mat.opacity > 0.02;
    }

    /* ice cubes drop in with stagger */
    if (iceGrp.current) {
      iceGrp.current.children.forEach((cube, i) => {
        const t = iceTargets.current[i];
        const local = clamp01((iceP - t.delay) / (1 - t.delay));
        const e = local * local * (3 - 2 * local);
        cube.position.y = THREE.MathUtils.lerp(3.2, t.yRest, e);
        cube.position.x = t.x;
        cube.position.z = t.z;
        (cube as THREE.Mesh).visible = local > 0.001;
      });
      // swirl ice with the drink
      iceGrp.current.rotation.y += delta * mixP * 3;
    }

    /* whole drink subtle life */
    if (drink.current) drink.current.rotation.y = Math.sin(performance.now() * 0.0003) * 0.15;
  });

  return (
    <group scale={0.66} position={[0, -0.15, 0]}>
      {/* sachet (reusing the realistic stick) */}
      <group ref={sachet} position={[0.15, 1.85, 0]} scale={0.62}>
        <SaltdStick flavour="Banta Lime Spark" />
      </group>

      {/* pour stream */}
      <mesh ref={stream} position={[0.55, 0.55, 0]}>
        <cylinderGeometry args={[0.045, 0.07, 1.7, 12]} />
        <meshStandardMaterial color={LIME} transparent opacity={0} emissive={LIME} emissiveIntensity={0.3} />
      </mesh>

      {/* glass + contents */}
      <group ref={drink}>
        {/* glass wall */}
        <mesh>
          <cylinderGeometry args={[GLASS_R, GLASS_R * 0.9, GLASS_H, 64, 1, true]} />
          <meshPhysicalMaterial
            transmission={1} thickness={0.6} roughness={0.02} ior={1.5}
            clearcoat={1} clearcoatRoughness={0.05}
            transparent opacity={0.9} color="#ffffff" side={THREE.DoubleSide}
            envMapIntensity={2} metalness={0} specularIntensity={1}
          />
        </mesh>
        {/* glass rim highlight */}
        <mesh position={[0, GLASS_H / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[GLASS_R, 0.025, 12, 64]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.5} roughness={0.1} metalness={0.2} />
        </mesh>
        {/* glass base */}
        <mesh position={[0, BOTTOM - 0.04, 0]}>
          <cylinderGeometry args={[GLASS_R * 0.9, GLASS_R * 0.85, 0.12, 64]} />
          <meshPhysicalMaterial transmission={1} thickness={0.9} roughness={0.05} ior={1.5} color="#ffffff" transparent opacity={0.85} envMapIntensity={2} />
        </mesh>

        {/* liquid (scaleY animated) */}
        <mesh ref={liquid} position={[0, BOTTOM, 0]}>
          <cylinderGeometry args={[INNER_R, INNER_R * 0.88, 1, 48]} />
          <meshPhysicalMaterial
            color={LIME} transmission={0.4} thickness={1.4} roughness={0.06}
            ior={1.34} transparent opacity={0.95} attenuationColor={LIME} attenuationDistance={0.6}
          />
        </mesh>

        {/* ice cubes */}
        <group ref={iceGrp}>
          {iceTargets.current.map((t, i) => (
            <RoundedBox key={i} args={[0.34, 0.34, 0.34]} radius={0.07} smoothness={4} rotation={t.rot} visible={false}>
              <meshPhysicalMaterial
                transmission={0.9} thickness={0.5} roughness={0.05} ior={1.31}
                transparent opacity={0.6} color="#eafff0" envMapIntensity={1.2}
              />
            </RoundedBox>
          ))}
        </group>
      </group>
    </group>
  );
}

export default function RitualScene3D({ progress }: { progress: number }) {
  const progressRef = useRef(progress);
  progressRef.current = progress;

  return (
    <Canvas
      camera={{ position: [0, 0.3, 7.2], fov: 30 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 8, 6]} intensity={2.6} />
      <directionalLight position={[-6, 3, -3]} intensity={1.6} color={LIME} />
      <pointLight position={[0, 2, 4]} intensity={1.4} color="#ffffff" />
      <pointLight position={[0, -1.5, 3]} intensity={1.0} color={LIME} />
      <Suspense fallback={null}>
        <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
          <Ritual progressRef={progressRef} />
        </Float>
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
