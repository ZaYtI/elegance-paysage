import { Color, DoubleSide, InstancedMesh, Object3D, PlaneGeometry, Quaternion, Vector3 } from "three";
import { hexToLinearRgb, mixRgb, type Rgb } from "./color-utils";
import { createStandardMaterial, enableShadows, type GardenBuilder } from "./garden-builder";

export type LeafCard = {
  position: Vector3Tuple;
  normal: Vector3Tuple;
  size: number;
  color: Rgb;
};

export type Vector3Tuple = [number, number, number];

export const foliageColors = {
  deepGreen: hexToLinearRgb(0x5c6b47),
  paleGreen: hexToLinearRgb(0x93a078),
  darkGreen: hexToLinearRgb(0x4d5a3d),
  softGreen: hexToLinearRgb(0x7e8c66),
};

export type BlobSpec = {
  center: Vector3Tuple;
  radii: Vector3Tuple;
  count: number;
  shadeDark: Rgb;
  shadeLight: Rgb;
  cardSize: number;
};

export function scatterLeafCards(cards: LeafCard[], random: () => number, blob: BlobSpec) {
  const { center, radii, count, shadeDark, shadeLight, cardSize } = blob;
  for (let k = 0; k < count; k++) {
    const u = random() * 2 - 1;
    const angle = random() * 6.283;
    const ring = Math.sqrt(1 - u * u);
    const direction: Vector3Tuple = [ring * Math.cos(angle), u, ring * Math.sin(angle)];
    const depth = 0.45 + 0.55 * Math.sqrt(random());
    const upper = direction[1] * 0.5 + 0.5;
    const brightness = (0.45 + 0.55 * upper) * (0.55 + 0.45 * depth) * (0.8 + 0.4 * random());
    cards.push({
      position: [
        center[0] + direction[0] * radii[0] * depth,
        center[1] + direction[1] * radii[1] * depth,
        center[2] + direction[2] * radii[2] * depth,
      ],
      normal: [
        direction[0] + (random() - 0.5) * 1.1,
        direction[1] + (random() - 0.5) * 1.1 + 0.3,
        direction[2] + (random() - 0.5) * 1.1,
      ],
      size: cardSize * (0.7 + 0.6 * random()),
      color: mixRgb(shadeDark, shadeLight, random() * (0.3 + 0.7 * upper), brightness),
    });
  }
}

export function createFoliage(builder: GardenBuilder) {
  const cardGeometry = new PlaneGeometry(1, 1);
  const leafMaterial = createStandardMaterial({
    map: builder.textures.leaf,
    alphaTest: 0.3,
    side: DoubleSide,
    roughness: 0.68,
    emissive: 0x1d2a10,
    emissiveIntensity: 0.35,
  });
  const placeholder = new Object3D();
  const color = new Color();
  const facing = new Quaternion();
  const spin = new Quaternion();
  const forward = new Vector3(0, 0, 1);
  const normal = new Vector3();

  const createCards = (cards: LeafCard[]): InstancedMesh => {
    const mesh = enableShadows(new InstancedMesh(cardGeometry, leafMaterial, cards.length));
    cards.forEach((card, index) => {
      normal.set(card.normal[0], card.normal[1], card.normal[2]).normalize();
      facing.setFromUnitVectors(forward, normal);
      spin.setFromAxisAngle(forward, builder.random() * 6.3);
      facing.multiply(spin);
      placeholder.position.set(card.position[0], card.position[1], card.position[2]);
      placeholder.quaternion.copy(facing);
      placeholder.scale.setScalar(card.size);
      placeholder.updateMatrix();
      mesh.setMatrixAt(index, placeholder.matrix);
      mesh.setColorAt(index, color.setRGB(card.color[0], card.color[1], card.color[2]));
    });
    mesh.frustumCulled = false;
    return mesh;
  };

  const scatterBlob = (cards: LeafCard[], blob: BlobSpec) => scatterLeafCards(cards, builder.random, blob);

  return { createCards, scatterBlob };
}

export type Foliage = ReturnType<typeof createFoliage>;
