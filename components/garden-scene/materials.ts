import { DoubleSide, MeshStandardMaterial } from "three";
import { createStandardMaterial } from "./garden-builder";
import type { GardenTextures } from "./textures";

export type BuildMaterials = {
  wood: MeshStandardMaterial;
  woodPost: MeshStandardMaterial;
  woodBeam: MeshStandardMaterial;
  stone: MeshStandardMaterial;
  darkMetal: MeshStandardMaterial;
  edging: MeshStandardMaterial;
  fencingMesh: MeshStandardMaterial;
};

export function createBuildMaterials(textures: GardenTextures): BuildMaterials {
  return {
    wood: createStandardMaterial({ map: textures.wood, color: 0xa8957f, roughness: 0.82 }),
    woodPost: createStandardMaterial({ map: textures.woodVertical, color: 0x7f6e5e, roughness: 0.85 }),
    woodBeam: createStandardMaterial({ map: textures.wood, color: 0x84735f, roughness: 0.85 }),
    stone: createStandardMaterial({
      map: textures.stone,
      bumpMap: textures.stone,
      bumpScale: 0.8,
      color: 0xe2dacb,
      roughness: 0.85,
    }),
    darkMetal: createStandardMaterial({ color: 0x302d28, roughness: 0.5, metalness: 0.55 }),
    edging: createStandardMaterial({ color: 0x3a342c, roughness: 0.6, metalness: 0.4 }),
    fencingMesh: new MeshStandardMaterial({
      map: textures.fencingMesh,
      color: 0x2e312c,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
      roughness: 0.5,
      metalness: 0.45,
    }),
  };
}
