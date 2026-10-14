import { Mesh, MeshStandardMaterial, PointLight, SphereGeometry } from "three";
import { createStandardMaterial, type GardenBuilder } from "./garden-builder";
import type { BuildMaterials } from "./materials";

export type Furniture = {
  lamps: PointLight[];
  bulbMaterial: MeshStandardMaterial;
};

const LAMP_POSITIONS: [number, number][] = [
  [0.35, 1.8],
  [1.6, 0.8],
  [2.8, -0.2],
];

function buildLoungeTable(builder: GardenBuilder, materials: BuildMaterials) {
  builder.box(-2.5, 0.47, 0.15, 1.45, 0.055, 0.7, materials.stone, 0.81);
  builder.shadowBlob(-2.5, 0.55, 2.8, 2.2, 0.8, 0.42);
  [-3.02, -1.98].forEach((x) => {
    [-0.08, 0.4].forEach((z) => builder.box(x, 0.29, z, 0.07, 0.42, 0.07, materials.darkMetal, 0.8));
  });
}

function buildChairs(builder: GardenBuilder, materials: BuildMaterials) {
  [-3.1, -1.9].forEach((x) => {
    builder.box(x, 0.44, 1.1, 0.5, 0.09, 0.5, materials.stone, 0.84);
    builder.box(x, 0.73, 1.34, 0.5, 0.44, 0.035, materials.wood, 0.85);
    [-0.18, 0.18].forEach((offsetX) => {
      [-0.18, 0.18].forEach((offsetZ) => {
        builder.box(x + offsetX, 0.27, 1.1 + offsetZ, 0.045, 0.36, 0.045, materials.darkMetal, 0.83);
      });
    });
  });
}

function buildLamps(builder: GardenBuilder, materials: BuildMaterials) {
  const bulbMaterial = createStandardMaterial({ color: 0xf2ede2, emissive: 0xffd9a0, emissiveIntensity: 0 });
  const bulbGeometry = new SphereGeometry(1, 18, 12);
  const lamps: PointLight[] = [];

  LAMP_POSITIONS.forEach(([x, z]) => {
    builder.shadowBlob(x - 0.42, z + 0.2, 0.5, 0.5, 0.88, 0.5);
    builder.box(x - 0.42, 0.37, z + 0.2, 0.06, 0.65, 0.06, materials.darkMetal, 0.88);
    const bulb = new Mesh(bulbGeometry, bulbMaterial);
    bulb.position.set(x - 0.42, 0.74, z + 0.2);
    bulb.scale.set(0.1, 0.08, 0.1);
    builder.world.add(bulb);
    builder.animate(bulb, 0.9, 0.05, "grow", 0);

    const light = new PointLight(0xffd29a, 0, 3.2, 2);
    light.position.set(x - 0.42, 0.9, z + 0.2);
    builder.world.add(light);
    lamps.push(light);
  });

  return { lamps, bulbMaterial };
}

export function buildFurniture(builder: GardenBuilder, materials: BuildMaterials): Furniture {
  buildLoungeTable(builder, materials);
  buildChairs(builder, materials);
  return buildLamps(builder, materials);
}
