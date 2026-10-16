import {
  ACESFilmicToneMapping,
  Group,
  Mesh,
  Object3D,
  PCFShadowMap,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Texture,
  WebGLRenderer,
  type Material,
} from "three";
import { createBuildAnimation } from "./build-animation";
import { placeCamera, type OrbitCamera } from "./camera";
import { discardScenery } from "./discard-scenery";
import { buildFurniture } from "./furniture";
import { GardenBuilder } from "./garden-builder";
import { buildGrass } from "./grass";
import { buildHardscape } from "./hardscape";
import { buildHedge } from "./hedge";
import { addHorizonBands } from "./horizon-bands";
import { createFoliage } from "./foliage";
import { addLights } from "./lights-and-environment";
import { createBuildMaterials } from "./materials";
import { createRandom } from "./noise";
import { buildPergola } from "./pergola";
import type { QualityProfile } from "./quality";
import { createShrubPlanter } from "./shrubs";
import { createRocks, createTerrain } from "./terrain";
import { createGardenTextures } from "./textures";
import { createTreePlanter } from "./trees";

export type GardenRenderRequest = {
  width: number;
  height: number;
  progress: number;
  time: number;
  camera: OrbitCamera;
};

export type GardenWorld = {
  canvas: HTMLCanvasElement;
  render: (request: GardenRenderRequest) => void;
  dispose: () => void;
};

const RANDOM_SEED = 6241;

function disposeMaterial(material: Material) {
  Object.values(material).forEach((value) => {
    if (value instanceof Texture) value.dispose();
  });
  material.dispose();
}

function disposeScene(scene: Scene) {
  scene.traverse((object: Object3D) => {
    const mesh = object as Mesh;
    mesh.geometry?.dispose();
    if (Array.isArray(mesh.material)) mesh.material.forEach(disposeMaterial);
    else if (mesh.material) disposeMaterial(mesh.material);
  });
  scene.environment?.dispose();
}

export function createGardenWorld(canvas: HTMLCanvasElement, quality: QualityProfile): GardenWorld {
  const renderer = new WebGLRenderer({ canvas, antialias: quality.antialias, alpha: true });
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;

  const scene = new Scene();
  const camera = new PerspectiveCamera(20, 1.25, 0.3, 260);
  addLights(renderer, scene, quality.shadowMapSize);

  const random = createRandom(RANDOM_SEED);
  const textures = createGardenTextures(random);
  const builder = new GardenBuilder(scene, random, textures);
  const materials = createBuildMaterials(textures);

  const terrain = createTerrain(builder);
  const hardscape = buildHardscape(builder, materials);
  buildPergola(builder, materials);
  const furniture = buildFurniture(builder, materials);
  const { uniforms: grassUniforms, meadow } = buildGrass(builder, hardscape.steppingStones, quality.grassDensity);

  const foliage = createFoliage(builder);
  const { plantTree, canopies } = createTreePlanter(builder, foliage);
  plantTree(2.9, -2.1, 1.0, 0.65);
  plantTree(3.4, 2.45, 0.88, 0.69);
  const shrubs = createShrubPlanter(builder, foliage);
  shrubs.plantBorderBeds();
  const horizonBands = addHorizonBands(builder);
  const surroundings = shrubs.plantSurroundings();
  buildHedge(builder, foliage);
  const rocks = createRocks(builder);

  discardScenery([meadow, ...horizonBands, ...surroundings]);
  const buildAnimation = createBuildAnimation({
    terrain,
    rocks,
    animated: builder.animated.filter((element) => !surroundings.includes(element.object as Group)),
    gateLeaves: hardscape.gateLeaves,
    lamps: furniture.lamps,
    bulbMaterial: furniture.bulbMaterial,
    grassUniforms,
    canopies,
  });

  let sizeKey = "";
  let shadowProgress = -1;

  const render = ({ width, height, progress, time, camera: orbit }: GardenRenderRequest) => {
    const key = `${width}x${height}`;
    if (key !== sizeKey) {
      sizeKey = key;
      renderer.setSize(width, height, false);
    }

    placeCamera(camera, orbit, width / height);
    buildAnimation.apply(progress, time);
    if (progress !== shadowProgress) {
      shadowProgress = progress;
      renderer.shadowMap.needsUpdate = true;
    }

    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  };

  const dispose = () => {
    disposeScene(scene);
    renderer.dispose();
    renderer.forceContextLoss();
  };

  return { canvas, render, dispose };
}
