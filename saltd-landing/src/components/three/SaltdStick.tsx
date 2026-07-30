'use client';
import { useMemo, useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BRAND = '#2E5BFF';   // single brand colour for every product
const INK   = '#0D0D0D';

/* ---------- procedural textures (no external files) ---------- */

/** Subtle crinkled-foil height map for the pouch body. */
function makeFoilBump() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d')!;
  const img = ctx.createImageData(256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    // soft value noise → gentle crinkle
    const v = 120 + Math.random() * 90;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  // blur the noise so it reads as soft wrinkles, not static
  ctx.filter = 'blur(1.4px)';
  ctx.drawImage(c, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 6);
  return tex;
}

/** Vertical ridges for the crimped top/bottom seals. */
function makeCrimpBump() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 16;
  const ctx = c.getContext('2d')!;
  for (let x = 0; x < 256; x += 8) {
    ctx.fillStyle = (x / 8) % 2 === 0 ? '#fff' : '#666';
    ctx.fillRect(x, 0, 8, 16);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/** Printed sachet label, modelled on the real SALTD stick artwork. */
function makeLabel(flavour: string) {
  const c = document.createElement('canvas');
  c.width = 320; c.height = 1280;
  const ctx = c.getContext('2d')!;

  // foil base
  ctx.fillStyle = BRAND;
  ctx.fillRect(0, 0, 320, 1280);

  // faint repeating SALTD watermark up the foil
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = INK;
  ctx.font = 'bold 30px Arial';
  ctx.textAlign = 'center';
  for (let y = 120; y < 1280; y += 150) ctx.fillText('SALTD.', 160, y);
  ctx.restore();

  // top brand mark
  ctx.fillStyle = INK;
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('SALTD', 150, 150);
  ctx.fillStyle = '#ffffff';
  ctx.fillText('.', 250, 150);

  // white info panel
  const px = 34, pw = 252, py = 470, ph = 360, r = 30;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px + r, py);
  ctx.arcTo(px + pw, py, px + pw, py + ph, r);
  ctx.arcTo(px + pw, py + ph, px, py + ph, r);
  ctx.arcTo(px, py + ph, px, py, r);
  ctx.arcTo(px, py, px + pw, py, r);
  ctx.closePath();
  ctx.fill();

  // panel content
  ctx.fillStyle = INK;
  ctx.font = 'bold 30px Arial';
  ctx.fillText('FILL N HYDRATE', 160, py + 70);

  // three benefit dots
  const dots = ['NO SUGAR', '4 SALTS', 'VIT C'];
  dots.forEach((d, i) => {
    const dx = 80 + i * 80;
    ctx.beginPath();
    ctx.arc(dx, py + 150, 22, 0, Math.PI * 2);
    ctx.fillStyle = BRAND;
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = '13px Arial';
    ctx.fillText(d, dx, py + 210);
  });

  ctx.fillStyle = 'rgba(13,13,13,0.55)';
  ctx.font = '17px Arial';
  ctx.fillText('ELECTROLYTE DRINK MIX', 160, py + 290);

  // flavour name on foil under panel
  ctx.fillStyle = INK;
  ctx.font = 'bold 34px Arial';
  ctx.fillText(flavour.toUpperCase(), 160, 960);
  ctx.fillStyle = 'rgba(13,13,13,0.6)';
  ctx.font = '18px Arial';
  ctx.fillText('NET WT. 5g', 160, 1010);

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  return tex;
}

/* ---------- the stick ---------- */

export function SaltdStick({
  flavour = 'Banta Lime Spark',
  scrollSpin = 0,
  idle = true,
}: {
  flavour?: string;
  scrollSpin?: number;
  idle?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const foilBump  = useMemo(makeFoilBump, []);
  const crimpBump = useMemo(makeCrimpBump, []);
  const label     = useMemo(() => makeLabel(flavour), [flavour]);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (idle) {
      group.current.rotation.y += delta * 0.35 + (scrollSpin - group.current.rotation.y) * 0.04;
    } else {
      // pure scroll-driven rotation
      group.current.rotation.y += (scrollSpin - group.current.rotation.y) * Math.min(delta * 6, 1);
    }
  });

  const W = 0.62, H = 2.6, D = 0.17;

  return (
    <group ref={group}>
      {/* foil body */}
      <RoundedBox args={[W, H, D]} radius={0.075} smoothness={8} castShadow>
        <meshStandardMaterial
          color={BRAND}
          metalness={0.85}
          roughness={0.38}
          bumpMap={foilBump}
          bumpScale={0.015}
          envMapIntensity={1.3}
        />
      </RoundedBox>

      {/* crimped seals top & bottom */}
      {[H / 2 + 0.05, -H / 2 - 0.05].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[W + 0.03, 0.16, D + 0.03]} />
          <meshStandardMaterial
            color={BRAND}
            metalness={0.9}
            roughness={0.5}
            bumpMap={crimpBump}
            bumpScale={0.05}
            envMapIntensity={1.1}
          />
        </mesh>
      ))}

      {/* printed labels (front + back) */}
      {[D / 2 + 0.002, -D / 2 - 0.002].map((z, i) => (
        <mesh key={i} position={[0, 0, z]} rotation={[0, i === 1 ? Math.PI : 0, 0]}>
          <planeGeometry args={[W, H]} />
          <meshStandardMaterial map={label} metalness={0.35} roughness={0.45} />
        </mesh>
      ))}
    </group>
  );
}
