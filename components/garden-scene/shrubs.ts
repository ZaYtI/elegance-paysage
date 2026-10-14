import { Group, IcosahedronGeometry, InstancedMesh, Object3D } from "three";
import type { Rgb } from "./color-utils";
import { createStandardMaterial, enableShadows, type GardenBuilder } from "./garden-builder";
import { foliageColors, type Foliage, type LeafCard } from "./foliage";

const SURROUNDING_SHRUBS: [number, number, number][] = [
  [-5.4, -4.0, 0.5],
  [0.4, -4.6, 0.45],
  [5.3, -4.4, 0.55],
  [5.8, 3.4, 0.42],
  [-5.6, 3.2, 0.48],
  [5.6, -1.4, 0.38],
];

export function createShrubPlanter(builder: GardenBuilder, foliage: Foliage) {
  const { random } = builder;
  const blossomGeometry = new IcosahedronGeometry(0.03, 1);
  const blossomMaterial = createStandardMaterial({ color: 0xf2ede2, roughness: 0.6 });
  const placeholder = new Object3D();

  const addBlossoms = (shrub: Group, radius: number) => {
    const blossoms = enableShadows(new InstancedMesh(blossomGeometry, blossomMaterial, 9));
    for (let k = 0; k < 9; k++) {
      const angle = random() * 6.3;
      const distance = random() * radius * 0.8;
      placeholder.position.set(
        Math.cos(angle) * distance,
        radius * 1.45 + random() * 0.06 - distance * 0.4,
        Math.sin(angle) * distance,
      );
      placeholder.rotation.set(0, 0, 0);
      placeholder.scale.setScalar(0.8 + random() * 0.7);
      placeholder.updateMatrix();
      blossoms.setMatrixAt(k, placeholder.matrix);
    }
    shrub.add(blossoms);
  };

  const plantShrub = (
    x: number,
    z: number,
    radius: number,
    shadeDark: Rgb,
    shadeLight: Rgb,
    start: number,
    blossoming: boolean,
  ) => {
    const shrub = new Group();
    const cards: LeafCard[] = [];
    shrub.position.set(x, 0.1, z);
    foliage.scatterBlob(cards, {
      center: [0, radius * 0.75, 0],
      radii: [radius, radius * 0.8, radius],
      count: (130 + radius * 420) | 0,
      shadeDark,
      shadeLight,
      cardSize: 0.13,
    });
    shrub.add(foliage.createCards(cards));
    builder.shadowBlob(0, 0, radius * 3, radius * 3, null, 0.5, shrub);
    if (blossoming) addBlossoms(shrub, radius);
    builder.world.add(shrub);
    builder.animate(shrub, start, 0.1, "grow", 0);
    return shrub;
  };

  const plantBorderBeds = () => {
    const { deepGreen, paleGreen, softGreen } = foliageColors;
    for (let i = 0; i < 17; i++) {
      plantShrub(
        0.85 + (i % 7) * 0.47 + (random() - 0.5) * 0.1,
        -2.82 + Math.floor(i / 7) * 0.42 + (random() - 0.5) * 0.08,
        0.2 + (i % 3) * 0.045,
        i % 3 ? deepGreen : softGreen,
        i % 3 ? softGreen : paleGreen,
        0.7 + i * 0.004,
        i % 4 === 1,
      );
    }
    for (let i = 0; i < 10; i++) {
      plantShrub(
        -3.98 + (i % 5) * 0.34,
        2.5 + Math.floor(i / 5) * 0.4,
        0.15 + (i % 2) * 0.03,
        i % 3 ? softGreen : deepGreen,
        paleGreen,
        0.72 + i * 0.006,
        i % 3 === 0,
      );
    }
  };

  const plantSurroundings = (): Group[] => {
    const { darkGreen, softGreen } = foliageColors;
    return SURROUNDING_SHRUBS.map(([x, z, radius]) => plantShrub(x, z, radius, darkGreen, softGreen, -1, false));
  };

  return { plantBorderBeds, plantSurroundings };
}
