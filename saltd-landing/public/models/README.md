# SALTD 3D models

Drop your `.glb` model files here. The site auto-detects them (via a HEAD
request) and instantly upgrades the relevant section from the photo fallback
to real photorealistic Three.js — **no code changes needed**.

## Expected filenames

| File | Used by | Section |
|------|---------|---------|
| `sachet-banta-lime-spark.glb` | Flavour showcase | Banta Lime Spark hero |
| `sachet-kala-khatta.glb`      | Flavour showcase | Kala Khatta hero |
| `sachet-peach-himalayan.glb`  | Flavour showcase | Peach Himalayan hero |
| `sachet.glb`                  | Ingredients + Ritual scroll | Generic sachet |

If you only have one model, name it `sachet.glb` — the Ingredients and Ritual
sections will use it. The flavour showcase falls back to photos for any
flavour whose specific model is missing.

## Model guidelines (for the best look)

- **Format:** `.glb` (binary glTF, single file). Export from Blender / Spline /
  RealityKit with embedded textures.
- **Scale:** roughly 1–2 units tall. The scene auto-centers and frames it, but
  keep it sane so lighting reads well.
- **Up axis:** Y-up (glTF standard).
- **Materials:** PBR (metalness/roughness). The scene uses a `city` HDRI
  environment + a lime rim light, so reflective/metallic sachet foil looks great.
- **Optimize:** run through [gltf.report](https://gltf.report) or
  `gltf-transform optimize` to keep each file < ~3 MB.

To change a path or rotation speed, edit the `model` field in
`src/components/sections/FlavourShowcase3D.tsx` and the `SACHET_MODEL`
constant in `IngredientsScroll.tsx` / `RitualScroll3D.tsx`.
