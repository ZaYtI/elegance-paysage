import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  type MeshStandardMaterial,
} from "three";
import { hexToLinearRgb } from "./color-utils";
import { createStandardMaterial, enableShadows, type GardenBuilder } from "./garden-builder";
import {
  GROUND_HALF_DEPTH,
  GROUND_HALF_WIDTH,
  diagonalWave,
  gentleHeight,
  groundZone,
  roughHeight,
  valueNoise,
} from "./noise";

const GRID_X = 108;
const GRID_Z = 84;
const VERTICES_X = GRID_X + 1;
const VERTICES_Z = GRID_Z + 1;
const VERTEX_COUNT = VERTICES_X * VERTICES_Z;
const SLAB_BOTTOM = -0.85;

export const terrainPalette = {
  apronRough: hexToLinearRgb(0x67704d),
  apronLevelled: hexToLinearRgb(0x62714f),
  rough: hexToLinearRgb(0x8a7a66),
  weed: hexToLinearRgb(0x7b7c58),
  level: hexToLinearRgb(0x6c5d4f),
  lawn: hexToLinearRgb(0x5f7052),
  deck: hexToLinearRgb(0x5a4e42),
  mulch: hexToLinearRgb(0x3c342b),
};

type SideEdgeVertex = {
  vertexIndex: number;
  normalX: number;
  normalZ: number;
  along: number;
  isLast: boolean;
};

export type Terrain = {
  ground: Mesh;
  groundGeometry: BufferGeometry;
  positions: Float32Array;
  colors: Float32Array;
  roughHeights: Float32Array;
  gentleHeights: Float32Array;
  waves: Float32Array;
  zones: Uint8Array;
  noiseLarge: Float32Array;
  noiseFine: Float32Array;
  walls: Mesh;
  wallGeometry: BufferGeometry;
  wallPositions: Float32Array;
  sideEdges: SideEdgeVertex[];
  shadowPlate: Mesh;
  apron: Mesh;
  apronMaterial: MeshStandardMaterial;
};

function createGround(builder: GardenBuilder) {
  const positions = new Float32Array(VERTEX_COUNT * 3);
  const colors = new Float32Array(VERTEX_COUNT * 3);
  const uvs = new Float32Array(VERTEX_COUNT * 2);
  const indices: number[] = [];
  const roughHeights = new Float32Array(VERTEX_COUNT);
  const gentleHeights = new Float32Array(VERTEX_COUNT);
  const waves = new Float32Array(VERTEX_COUNT);
  const zones = new Uint8Array(VERTEX_COUNT);
  const noiseLarge = new Float32Array(VERTEX_COUNT);
  const noiseFine = new Float32Array(VERTEX_COUNT);

  for (let j = 0; j < VERTICES_Z; j++) {
    for (let i = 0; i < VERTICES_X; i++) {
      const k = j * VERTICES_X + i;
      const x = -GROUND_HALF_WIDTH + (9 * i) / GRID_X;
      const z = -GROUND_HALF_DEPTH + (7 * j) / GRID_Z;
      positions[k * 3] = x;
      positions[k * 3 + 2] = z;
      uvs[k * 2] = x * 0.7;
      uvs[k * 2 + 1] = z * 0.7;
      roughHeights[k] = roughHeight(x, z);
      gentleHeights[k] = gentleHeight(x, z);
      waves[k] = diagonalWave(x, z);
      zones[k] = groundZone(x, z);
      noiseLarge[k] = valueNoise(x * 1.1 + 11, z * 1.1 + 5);
      noiseFine[k] = valueNoise(x * 3.7 + 2, z * 3.7 + 9);
    }
  }
  for (let j = 0; j < GRID_Z; j++) {
    for (let i = 0; i < GRID_X; i++) {
      const a = j * VERTICES_X + i;
      const b = a + 1;
      const c = a + VERTICES_X;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
  geometry.setIndex(indices);

  const ground = new Mesh(
    geometry,
    createStandardMaterial({
      map: builder.textures.grain,
      vertexColors: true,
      bumpMap: builder.textures.grain,
      bumpScale: 1,
    }),
  );
  ground.receiveShadow = true;
  builder.world.add(ground);

  return { ground, geometry, positions, colors, roughHeights, gentleHeights, waves, zones, noiseLarge, noiseFine };
}

function createWalls(builder: GardenBuilder, groundPositions: Float32Array) {
  const sideEdges: SideEdgeVertex[] = [];
  for (let i = 0; i < VERTICES_X; i++) {
    sideEdges.push({ vertexIndex: GRID_Z * VERTICES_X + i, normalX: 0, normalZ: 1, along: (i / GRID_X) * 9, isLast: i === VERTICES_X - 1 });
  }
  for (let i = 0; i < VERTICES_X; i++) {
    sideEdges.push({ vertexIndex: i, normalX: 0, normalZ: -1, along: (i / GRID_X) * 9, isLast: i === VERTICES_X - 1 });
  }
  for (let j = 0; j < VERTICES_Z; j++) {
    sideEdges.push({ vertexIndex: j * VERTICES_X + GRID_X, normalX: 1, normalZ: 0, along: (j / GRID_Z) * 7, isLast: j === VERTICES_Z - 1 });
  }
  for (let j = 0; j < VERTICES_Z; j++) {
    sideEdges.push({ vertexIndex: j * VERTICES_X, normalX: -1, normalZ: 0, along: (j / GRID_Z) * 7, isLast: j === VERTICES_Z - 1 });
  }

  const wallPositions = new Float32Array(sideEdges.length * 6);
  const wallNormals = new Float32Array(sideEdges.length * 6);
  const wallUvs = new Float32Array(sideEdges.length * 4);
  const indices: number[] = [];

  sideEdges.forEach((edge, n) => {
    const x = groundPositions[edge.vertexIndex * 3];
    const z = groundPositions[edge.vertexIndex * 3 + 2];
    wallPositions.set([x, 0, z, x, SLAB_BOTTOM, z], n * 6);
    wallNormals.set([edge.normalX, 0, edge.normalZ, edge.normalX, 0, edge.normalZ], n * 6);
    wallUvs.set([edge.along * 0.18, 1, edge.along * 0.18, 0], n * 4);
    if (!edge.isLast) {
      const a = n * 2;
      indices.push(a, a + 1, a + 2, a + 2, a + 1, a + 3);
    }
  });

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(wallPositions, 3));
  geometry.setAttribute("normal", new BufferAttribute(wallNormals, 3));
  geometry.setAttribute("uv", new BufferAttribute(wallUvs, 2));
  geometry.setIndex(indices);

  const walls = new Mesh(geometry, createStandardMaterial({ map: builder.textures.strata, side: DoubleSide }));
  walls.receiveShadow = true;
  builder.world.add(walls);
  return { walls, geometry, wallPositions, sideEdges };
}

function createShadowPlate(builder: GardenBuilder): Mesh {
  const plate = new Mesh(
    new PlaneGeometry(17, 15),
    new MeshBasicMaterial({ map: builder.textures.shadowBlob, transparent: true, depthWrite: false, toneMapped: false }),
  );
  plate.rotation.x = -Math.PI / 2;
  plate.position.y = SLAB_BOTTOM - 0.5;
  builder.scene.add(plate);
  return plate;
}

function createApron(builder: GardenBuilder) {
  const texture = builder.textures.grain.clone();
  texture.repeat.set(80, 80);
  texture.needsUpdate = true;
  const material = createStandardMaterial({ map: texture, roughness: 1 });
  const apron = new Mesh(new PlaneGeometry(400, 400), material);
  apron.rotation.x = -Math.PI / 2;
  apron.receiveShadow = true;
  builder.world.add(apron);
  return { apron, material };
}

const ROCKS: [number, number, number][] = [
  [-2.6, -1.6, 0.3],
  [2.4, 1.2, 0.24],
  [-0.6, 2.4, 0.2],
  [3.3, -2.2, 0.18],
  [-3.4, 1.4, 0.16],
  [0.8, -0.8, 0.13],
];

export function createRocks(builder: GardenBuilder): Group {
  const rocks = new Group();
  const material = createStandardMaterial({ map: builder.textures.stone, color: 0x9a948a, roughness: 0.95 });
  for (const [x, z, size] of ROCKS) {
    const geometry = new IcosahedronGeometry(1, 2);
    const positions = geometry.attributes.position;
    for (let k = 0; k < positions.count; k++) {
      const px = positions.getX(k);
      const py = positions.getY(k);
      const pz = positions.getZ(k);
      const bulge = 0.78 + 0.4 * valueNoise(px * 1.7 + x * 3, py * 1.7 + pz * 1.7 + z);
      positions.setXYZ(k, px * bulge, py * bulge * 0.62, pz * bulge);
    }
    geometry.computeVertexNormals();
    const rock = enableShadows(new Mesh(geometry, material));
    rock.scale.setScalar(size);
    rock.position.set(x, roughHeight(x, z) + size * 0.15, z);
    rock.rotation.y = builder.random() * 6;
    rocks.add(rock);
  }
  builder.world.add(rocks);
  return rocks;
}

export function createTerrain(builder: GardenBuilder): Terrain {
  const ground = createGround(builder);
  const walls = createWalls(builder, ground.positions);
  const shadowPlate = createShadowPlate(builder);
  const apron = createApron(builder);
  return {
    ground: ground.ground,
    groundGeometry: ground.geometry,
    positions: ground.positions,
    colors: ground.colors,
    roughHeights: ground.roughHeights,
    gentleHeights: ground.gentleHeights,
    waves: ground.waves,
    zones: ground.zones,
    noiseLarge: ground.noiseLarge,
    noiseFine: ground.noiseFine,
    walls: walls.walls,
    wallGeometry: walls.geometry,
    wallPositions: walls.wallPositions,
    sideEdges: walls.sideEdges,
    shadowPlate,
    apron: apron.apron,
    apronMaterial: apron.material,
  };
}

export const terrainVertexCount = VERTEX_COUNT;
