import {
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  InstancedBufferAttribute,
  InstancedMesh,
  Object3D,
  Color,
  type WebGLProgramParametersWithUniforms,
} from "three";
import { hexToLinearRgb, mixRgb, type Rgb } from "./color-utils";
import { createStandardMaterial, type GardenBuilder } from "./garden-builder";
import { GROUND_HALF_DEPTH, GROUND_HALF_WIDTH, diagonalWave, gentleHeight, groundZone, roughHeight, valueNoise } from "./noise";
import type { SteppingStone } from "./hardscape";

export type GrassUniforms = {
  progress: { value: number };
  time: { value: number };
};

type BladePlacement = {
  y: number;
  width: number;
  height: number;
  color: Rgb;
  growStart: number;
  growDuration: number;
};

type PlacementPicker = (x: number, z: number) => BladePlacement | null;

type GrassPatch = {
  count: number;
  withering: boolean;
  pick: PlacementPicker;
  halfWidth?: number;
  halfDepth?: number;
};

function createTuftGeometry(): BufferGeometry {
  const positions: number[] = [];
  const shades: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  const bladeBases: [number, number, number][] = [
    [0, 0, 0],
    [0.022, -0.016, 2.2],
    [-0.02, 0.02, 4.3],
  ];
  const bladeProfile: [number, number, number, number][] = [
    [-0.5, 0, 0, 0.45],
    [0.5, 0, 0, 0.45],
    [-0.34, 0.52, 0.5, 0.8],
    [0.34, 0.52, 0.5, 0.8],
    [0, 1, 1.2, 1],
  ];

  bladeBases.forEach(([baseX, baseZ, angle]) => {
    const offset = positions.length / 3;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    bladeProfile.forEach(([profileX, profileY, profileZ, shade]) => {
      const x = profileX * 0.024;
      const z = profileZ * 0.022;
      positions.push(baseX + x * cos - z * sin, profileY, baseZ + x * sin + z * cos);
      shades.push(shade, shade, shade);
      normals.push(0, 1, 0);
    });
    indices.push(offset, offset + 1, offset + 2, offset + 1, offset + 3, offset + 2, offset + 2, offset + 3, offset + 4);
  });

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(shades, 3));
  geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);
  return geometry;
}

function createGrassMaterial(uniforms: GrassUniforms, withering: boolean) {
  const material = createStandardMaterial({ vertexColors: true, side: DoubleSide, roughness: 0.88 });
  material.customProgramCacheKey = () => `garden-grass-${withering ? 1 : 0}`;
  material.onBeforeCompile = (shader: WebGLProgramParametersWithUniforms) => {
    shader.uniforms.uT = uniforms.progress;
    shader.uniforms.uTime = uniforms.time;
    const growth = withering ? "gg = 1.0 - gg;\n" : "";
    const swayAmount = withering ? "0.2" : "0.11";
    const beginVertex =
      "vec3 transformed = vec3(position);\n" +
      "float gg = smoothstep(aGrow.x, aGrow.x + aGrow.y, uT);\n" +
      growth +
      "transformed *= vec3(min(1.0, gg * 4.0), gg, min(1.0, gg * 4.0));\n" +
      "float ph = instanceMatrix[3][0] * 1.3 + instanceMatrix[3][2] * 0.9;\n" +
      "float sw = sin(uTime * 1.5 + ph) * 0.6 + sin(uTime * 2.9 + ph * 1.7) * 0.3;\n" +
      `transformed.x += sw * ${swayAmount} * position.y * position.y * gg;\n`;
    shader.vertexShader =
      "attribute vec2 aGrow;\nuniform float uT;\nuniform float uTime;\n" +
      shader.vertexShader.replace("#include <begin_vertex>", beginVertex);
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <normal_fragment_begin>",
      "#include <normal_fragment_begin>\nnormal = normalize(vNormal);\n",
    );
  };
  return material;
}

function scatterGrass(builder: GardenBuilder, uniforms: GrassUniforms, patch: GrassPatch): InstancedMesh {
  const { random } = builder;
  const geometry = createTuftGeometry();
  const mesh = new InstancedMesh(geometry, createGrassMaterial(uniforms, patch.withering), patch.count);
  const growTimings = new Float32Array(patch.count * 2);
  const placeholder = new Object3D();
  const color = new Color();
  const halfWidth = patch.halfWidth ?? 4.47;
  const halfDepth = patch.halfDepth ?? 3.47;
  let placed = 0;
  let attempts = 0;

  while (placed < patch.count && attempts++ < patch.count * 8) {
    const x = -halfWidth + random() * 2 * halfWidth;
    const z = -halfDepth + random() * 2 * halfDepth;
    const placement = patch.pick(x, z);
    if (!placement) continue;
    placeholder.position.set(x, placement.y, z);
    placeholder.rotation.set(0, random() * 6.3, 0);
    placeholder.scale.set(placement.width, placement.height, placement.width);
    placeholder.updateMatrix();
    mesh.setMatrixAt(placed, placeholder.matrix);
    mesh.setColorAt(placed, color.setRGB(placement.color[0], placement.color[1], placement.color[2]));
    growTimings[placed * 2] = placement.growStart;
    growTimings[placed * 2 + 1] = placement.growDuration;
    placed++;
  }

  mesh.count = placed;
  geometry.setAttribute("aGrow", new InstancedBufferAttribute(growTimings, 2));
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  builder.world.add(mesh);
  return mesh;
}

function isOnSteppingStone(stones: SteppingStone[], x: number, z: number): boolean {
  return stones.some((stone) => {
    const dx = x - stone.x;
    const dz = z - stone.z;
    const cos = Math.cos(stone.rotation);
    const sin = Math.sin(stone.rotation);
    return Math.abs(dx * cos - dz * sin) < stone.sizeX / 2 + 0.03 && Math.abs(dx * sin + dz * cos) < stone.sizeZ / 2 + 0.03;
  });
}

export function buildGrass(builder: GardenBuilder, steppingStones: SteppingStone[]) {
  const { random } = builder;
  const uniforms: GrassUniforms = { progress: { value: 0 }, time: { value: 0 } };

  const lawnLight = hexToLinearRgb(0x6f8260);
  const lawnBright = hexToLinearRgb(0x93a482);
  const lawnDark = hexToLinearRgb(0x586a4c);
  const weedLight = hexToLinearRgb(0xa39a6c);
  const weedDark = hexToLinearRgb(0x7f8258);
  const meadowDark = hexToLinearRgb(0x5d6744);
  const meadowLight = hexToLinearRgb(0x808859);

  scatterGrass(builder, uniforms, {
    count: 52000,
    withering: false,
    pick: (x, z) => {
      if (groundZone(x, z) !== 1 || isOnSteppingStone(steppingStones, x, z)) return null;
      const wave = diagonalWave(x, z);
      const mowingStripe = Math.floor((x + z * 0.35 + 9) * 1.25) % 2 ? 1.07 : 0.93;
      const patchNoise = valueNoise(x * 0.9 + 4, z * 0.9 + 2);
      const brightPick = random();
      return {
        y: gentleHeight(x, z) - 0.008,
        width: 0.9 + random() * 0.5,
        height: 0.07 + random() * random() * 0.075,
        color:
          brightPick > 0.7
            ? mixRgb(lawnLight, lawnBright, random(), mowingStripe)
            : mixRgb(lawnLight, lawnDark, patchNoise, mowingStripe),
        growStart: 0.035 + 0.06 * wave,
        growDuration: 0.03 + random() * 0.03,
      };
    },
  });

  scatterGrass(builder, uniforms, {
    count: 3000,
    withering: true,
    pick: (x, z) => {
      if (random() > 0.2 + valueNoise(x * 0.8 + 7, z * 0.8 + 1) * 0.95) return null;
      const wave = diagonalWave(x, z);
      return {
        y: roughHeight(x, z) - 0.02,
        width: 1.4 + random(),
        height: 0.18 + random() * 0.42,
        color: mixRgb(weedLight, weedDark, random(), 0.75 + random() * 0.45),
        growStart: 0.005 + 0.04 * wave,
        growDuration: 0.025,
      };
    },
  });

  const meadow = scatterGrass(builder, uniforms, {
    count: 28000,
    withering: false,
    halfWidth: 8.8,
    halfDepth: 7.8,
    pick: (x, z) => {
      const distanceOutside = Math.max(Math.abs(x) - GROUND_HALF_WIDTH, Math.abs(z) - GROUND_HALF_DEPTH);
      if (distanceOutside < 0 || random() > Math.pow(1 - Math.min(1, distanceOutside / 5.5), 1.4)) return null;
      return {
        y: 0,
        width: 1.1 + random() * 0.6,
        height: 0.12 + random() * 0.2,
        color: mixRgb(meadowDark, meadowLight, random(), 0.75 + random() * 0.4),
        growStart: -1,
        growDuration: 0.001,
      };
    },
  });

  return { uniforms, meadow };
}
