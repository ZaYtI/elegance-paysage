import { Group, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import type { GardenBuilder } from "./garden-builder";
import type { BuildMaterials } from "./materials";

export type SteppingStone = { x: number; z: number; sizeX: number; sizeZ: number; rotation: number };

export type Hardscape = {
  steppingStones: SteppingStone[];
  gateLeaves: Group[];
};

function buildDeck(builder: GardenBuilder, materials: BuildMaterials) {
  for (let i = 0; i < 15; i++) {
    const plank = builder.box(-2.25, 0.105, -1.25 + i * 0.235, 3.4, 0.065, 0.215, materials.wood.clone(), 0.1 + i * 0.006);
    (plank.material as MeshStandardMaterial).color.multiplyScalar(0.86 + builder.random() * 0.22);
  }
}

function buildPath(builder: GardenBuilder, materials: BuildMaterials): SteppingStone[] {
  const stones: SteppingStone[] = [];
  for (let i = 0; i < 6; i++) {
    const stone = {
      x: 0.2 + i * 0.62,
      z: 1.8 - i * 0.48,
      sizeX: 0.56,
      sizeZ: 0.76,
      rotation: -0.3 + (builder.random() - 0.5) * 0.12,
    };
    stones.push(stone);
    builder.box(stone.x, 0.062, stone.z, stone.sizeX, 0.06, stone.sizeZ, materials.stone, 0.22 + i * 0.015, stone.rotation);
  }
  stones.push({ x: 0.7, z: 2.72, sizeX: 1.3, sizeZ: 0.74, rotation: 0 });
  builder.box(0.7, 0.062, 2.72, 1.3, 0.06, 0.74, materials.stone, 0.28);
  return stones;
}

function buildBedEdging(builder: GardenBuilder, materials: BuildMaterials) {
  builder.box(2.2, 0.12, -1.7, 3.64, 0.14, 0.03, materials.edging, 0.31);
  builder.box(0.4, 0.12, -2.4, 0.03, 0.14, 1.42, materials.edging, 0.31);
  builder.box(-3.3, 0.12, 2.28, 1.82, 0.14, 0.03, materials.edging, 0.32);
  builder.box(-2.4, 0.12, 2.72, 0.03, 0.14, 0.9, materials.edging, 0.32);
}

function buildBackFence(builder: GardenBuilder, materials: BuildMaterials) {
  for (let i = 0; i < 7; i++) {
    builder.box(-4 + i * 1.33, 1.0, -3.25, 0.12, 2.0, 0.12, materials.woodPost, 0.37 + i * 0.008);
  }
  for (let i = 0; i < 7; i++) {
    const slat = builder.box(0, 0.27 + i * 0.25, -3.2, 8.1, 0.15, 0.05, materials.wood.clone(), 0.39 + i * 0.009);
    (slat.material as MeshStandardMaterial).color.multiplyScalar(0.9 + builder.random() * 0.18);
  }
}

function buildGate(builder: GardenBuilder, materials: BuildMaterials): Group[] {
  [-0.75, 2.15].forEach((x) => {
    builder.box(x, 0.79, 3.12, 0.26, 1.55, 0.3, materials.stone, 0.41);
    builder.box(x, 1.6, 3.12, 0.34, 0.07, 0.38, materials.stone, 0.43);
  });

  const leaves: Group[] = [];
  const hinges: [number, number][] = [
    [-0.62, 1],
    [2.02, -1],
  ];
  hinges.forEach(([hingeX, direction]) => {
    const leaf = new Group();
    leaf.position.set(hingeX, 0, 3.12);
    builder.world.add(leaf);
    const length = 1.33;
    builder.box((direction * length) / 2, 0.23, 0, length, 0.075, 0.06, materials.darkMetal, null, 0, leaf);
    builder.box((direction * length) / 2, 1.38, 0, length, 0.075, 0.06, materials.darkMetal, null, 0, leaf);
    for (let i = 0; i < 10; i++) {
      builder.box(direction * (0.07 + i * 0.132), 0.8, 0, 0.083, 1.12, 0.04, materials.darkMetal, null, 0, leaf);
    }
    builder.box(direction * (length - 0.07), 0.85, 0.06, 0.05, 0.22, 0.06, materials.wood, null, 0, leaf);
    builder.animate(leaf, 0.43, 0.08, "rise", 0.5);
    leaf.userData.direction = direction;
    leaves.push(leaf);
  });
  builder.shadowBlob(-0.75, 3.12, 0.95, 0.95, 0.41);
  builder.shadowBlob(2.15, 3.12, 0.95, 0.95, 0.41);
  return leaves;
}

function buildFencingPanel(
  builder: GardenBuilder,
  materials: BuildMaterials,
  fromX: number,
  fromZ: number,
  toX: number,
  toZ: number,
  start: number,
) {
  const panelHeight = 1.2;
  const length = Math.hypot(toX - fromX, toZ - fromZ);
  const geometry = new PlaneGeometry(length, panelHeight);
  const uv = geometry.attributes.uv;
  for (let k = 0; k < uv.count; k++) uv.setXY(k, uv.getX(k) * length, uv.getY(k) * panelHeight);

  const panel = new Mesh(geometry, materials.fencingMesh);
  panel.position.set((fromX + toX) / 2, 0.06 + panelHeight / 2, (fromZ + toZ) / 2);
  panel.rotation.y = -Math.atan2(toZ - fromZ, toX - fromX);
  panel.receiveShadow = true;
  builder.world.add(panel);
  builder.animate(panel, start);

  [
    [fromX, fromZ],
    [toX, toZ],
  ].forEach(([x, z]) => {
    builder.box(x, 0.68, z, 0.06, 1.36, 0.06, materials.darkMetal, start - 0.01);
  });
}

function buildMeshFencing(builder: GardenBuilder, materials: BuildMaterials) {
  const panels: [number, number, number, number, number][] = [
    [-4.45, 3.12, -2.665, 3.12, 0.4],
    [-2.665, 3.12, -0.88, 3.12, 0.405],
    [2.28, 3.12, 4.45, 3.12, 0.41],
    [4.45, 3.12, 4.45, 1.0, 0.415],
    [4.45, 1.0, 4.45, -1.12, 0.42],
    [4.45, -1.12, 4.45, -3.25, 0.425],
    [-4.48, 3.12, -4.48, 1.95, 0.43],
  ];
  panels.forEach(([fromX, fromZ, toX, toZ, start]) => {
    buildFencingPanel(builder, materials, fromX, fromZ, toX, toZ, start);
  });
}

export function buildHardscape(builder: GardenBuilder, materials: BuildMaterials): Hardscape {
  buildDeck(builder, materials);
  const steppingStones = buildPath(builder, materials);
  buildBedEdging(builder, materials);
  buildBackFence(builder, materials);
  const gateLeaves = buildGate(builder, materials);
  buildMeshFencing(builder, materials);
  return { steppingStones, gateLeaves };
}
