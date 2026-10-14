import { CatmullRomCurve3, Group, Mesh, TubeGeometry, Vector3 } from "three";
import { createStandardMaterial, enableShadows, type GardenBuilder } from "./garden-builder";
import { foliageColors, type Foliage, type LeafCard, type Vector3Tuple } from "./foliage";

export type TreeSpecies = "round" | "oval" | "fir";

export type SwayingCanopy = { canopy: Group; phase: number };

const SEGMENTS = 10;
const RADIAL_SEGMENTS = 8;

function createBranchMesh(points: Vector3Tuple[], baseRadius: number, tipRadius: number, material: ReturnType<typeof createStandardMaterial>) {
  const curve = new CatmullRomCurve3(points.map((point) => new Vector3(point[0], point[1], point[2])));
  const geometry = new TubeGeometry(curve, SEGMENTS, 1, RADIAL_SEGMENTS, false);
  const positions = geometry.attributes.position;
  for (let i = 0; i <= SEGMENTS; i++) {
    const center = curve.getPointAt(i / SEGMENTS);
    const radius = baseRadius + (tipRadius - baseRadius) * (i / SEGMENTS);
    for (let j = 0; j <= RADIAL_SEGMENTS; j++) {
      const k = i * (RADIAL_SEGMENTS + 1) + j;
      positions.setXYZ(
        k,
        center.x + (positions.getX(k) - center.x) * radius,
        center.y + (positions.getY(k) - center.y) * radius,
        center.z + (positions.getZ(k) - center.z) * radius,
      );
    }
  }
  geometry.computeVertexNormals();
  return enableShadows(new Mesh(geometry, material));
}

export function createTreePlanter(builder: GardenBuilder, foliage: Foliage) {
  const { random } = builder;
  const { deepGreen, paleGreen, darkGreen } = foliageColors;
  const barkMaterial = createStandardMaterial({ map: builder.textures.bark, color: 0x86796b });
  const canopies: SwayingCanopy[] = [];

  const addFirFoliage = (trunk: Group, cards: LeafCard[], density: number, cardSize: number) => {
    trunk.add(createBranchMesh([[0, 0, 0], [0.01, 1.2, 0], [0, 2.6, 0.01]], 0.13, 0.04, barkMaterial));
    for (let y = 0.7; y < 4.2; y += 0.28) {
      const radius = 0.12 + 1.05 * Math.pow(1 - (y - 0.7) / 3.6, 1.1);
      foliage.scatterBlob(cards, {
        center: [0, y, 0],
        radii: [radius, 0.26, radius],
        count: ((40 + radius * 160) * density) | 0,
        shadeDark: darkGreen,
        shadeLight: deepGreen,
        cardSize: cardSize * 0.9,
      });
    }
  };

  const addOvalFoliage = (trunk: Group, cards: LeafCard[], lean: number, density: number, cardSize: number) => {
    trunk.add(createBranchMesh([[0, 0, 0], [lean, 0.5, 0], [lean * 1.5, 1.0, 0.02]], 0.11, 0.07, barkMaterial));
    for (let y = 1.1; y < 4.3; y += 0.42) {
      const t = (y - 1.1) / 3.2;
      const radius = 0.25 + 0.6 * Math.sin(Math.PI * Math.min(1, t * 0.95 + 0.05));
      foliage.scatterBlob(cards, {
        center: [lean * 2 + (random() - 0.5) * 0.15, y, (random() - 0.5) * 0.15],
        radii: [radius, 0.42, radius],
        count: ((120 + radius * 160) * density) | 0,
        shadeDark: deepGreen,
        shadeLight: paleGreen,
        cardSize,
      });
    }
  };

  const addRoundFoliage = (trunk: Group, cards: LeafCard[], lean: number, density: number, cardSize: number) => {
    const trunkHeight = 1.45 + random() * 0.5;
    trunk.add(
      createBranchMesh(
        [
          [0, 0, 0],
          [0.04 + lean, trunkHeight * 0.33, 0.02],
          [-0.03 + lean * 1.5, trunkHeight * 0.66, -0.03],
          [0.03 + lean * 2, trunkHeight, 0.02],
        ],
        0.12,
        0.055,
        barkMaterial,
      ),
    );
    const branchCount = 4 + ((random() * 3) | 0);
    const firstAngle = random() * 6.3;
    for (let b = 0; b < branchCount; b++) {
      const angle = firstAngle + (b * 6.283) / branchCount + (random() - 0.5) * 0.6;
      const reach = 0.4 + random() * 0.35;
      const tipY = trunkHeight + 0.3 + random() * 0.65;
      const forkY = trunkHeight * (0.6 + random() * 0.3);
      const crownRadius = 0.38 + random() * 0.22;
      trunk.add(
        createBranchMesh(
          [
            [lean * 1.5, forkY, 0],
            [Math.cos(angle) * reach * 0.45, forkY + (tipY - forkY) * 0.55, Math.sin(angle) * reach * 0.45],
            [Math.cos(angle) * reach, tipY, Math.sin(angle) * reach],
          ],
          0.045,
          0.014,
          barkMaterial,
        ),
      );
      foliage.scatterBlob(cards, {
        center: [Math.cos(angle) * reach, tipY + 0.08, Math.sin(angle) * reach],
        radii: [crownRadius * 1.1, crownRadius * 0.85, crownRadius * 1.1],
        count: ((200 * density * crownRadius) / 0.5) | 0,
        shadeDark: b % 2 ? deepGreen : darkGreen,
        shadeLight: paleGreen,
        cardSize,
      });
    }
    for (let b = 0; b < 3; b++) {
      foliage.scatterBlob(cards, {
        center: [(random() - 0.5) * 0.5 + lean * 2, trunkHeight + 0.55 + b * 0.38 + random() * 0.2, (random() - 0.5) * 0.5],
        radii: [0.45 + random() * 0.2, 0.38, 0.45 + random() * 0.2],
        count: (200 * density) | 0,
        shadeDark: b === 1 ? darkGreen : deepGreen,
        shadeLight: paleGreen,
        cardSize,
      });
    }
  };

  const plantTree = (x: number, z: number, scale: number, start: number, density = 1, species: TreeSpecies = "round") => {
    const tree = new Group();
    const canopy = new Group();
    const cards: LeafCard[] = [];
    const lean = (random() - 0.5) * 0.12;
    const cardSize = 0.24 / Math.sqrt(density);
    tree.position.set(x, 0.03, z);
    tree.rotation.y = random() * 6.3;

    if (species === "fir") addFirFoliage(tree, cards, density, cardSize);
    else if (species === "oval") addOvalFoliage(tree, cards, lean, density, cardSize);
    else addRoundFoliage(tree, cards, lean, density, cardSize);

    canopy.add(foliage.createCards(cards));
    tree.add(canopy);
    tree.scale.setScalar(scale);
    if (density >= 1) builder.shadowBlob(0, 0, 2.4, 2.4, null, 0.6, tree);
    builder.world.add(tree);
    builder.animate(tree, start, 0.12, "grow", 0);
    canopies.push({ canopy, phase: random() * 6 });
  };

  return { plantTree, canopies };
}
