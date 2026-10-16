import {
  ACESFilmicToneMapping,
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
import { buildFurniture } from "./furniture";
import { GardenBuilder } from "./garden-builder";
import { buildGrass } from "./grass";
import { buildHardscape } from "./hardscape";
import { buildHedge } from "./hedge";
import { addHorizonBands } from "./horizon-bands";
import { createFoliage } from "./foliage";
import { createBuildMaterials } from "./materials";
import { createRandom } from "./noise";
import { buildPergola } from "./pergola";
import { DepthOfFieldPass } from "./post-processing";
import type { QualityProfile } from "./quality";
import { createShrubPlanter } from "./shrubs";
import { addSkyAndLights } from "./sky-and-lights";
import { createRocks, createTerrain } from "./terrain";
import { createGardenTextures } from "./textures";
import { createTreePlanter } from "./trees";

export type RenderMode = "hero" | "still";

export type GardenRenderRequest = {
  width: number;
  height: number;
  progress: number;
  time: number;
  camera: OrbitCamera;
  mode: RenderMode;
};

export type GardenWorld = {
  canvas: HTMLCanvasElement;
  render: (request: GardenRenderRequest) => void;
  dispose: () => void;
};

const RANDOM_SEED = 6241;
const MAX_FACING_DOT_FOR_STILLS = 0.8;

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
  const { sky, fog } = addSkyAndLights(renderer, scene, quality.shadowMapSize);

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
  addHorizonBands(builder);
  shrubs.plantSurroundings();
  buildHedge(builder, foliage);
  const rocks = createRocks(builder);

  const surroundings = builder.animated.filter((element) => element.start < 0).map((element) => element.object);
  const buildAnimation = createBuildAnimation({
    terrain,
    rocks,
    animated: builder.animated,
    gateLeaves: hardscape.gateLeaves,
    lamps: furniture.lamps,
    bulbMaterial: furniture.bulbMaterial,
    grassUniforms,
    canopies,
  });

  let depthOfField: DepthOfFieldPass | null = null;
  let depthOfFieldFailed = false;
  let sizeKey = "";
  let shadowProgress = -1;

  const render = ({ width, height, progress, time, camera: orbit, mode }: GardenRenderRequest) => {
    const isStill = mode === "still";
    terrain.apron.visible = isStill;
    meadow.visible = isStill;
    sky.visible = isStill;
    terrain.shadowPlate.visible = !isStill;
    terrain.walls.visible = !isStill;
    scene.fog = isStill ? fog : null;

    const key = `${width}x${height}`;
    if (key !== sizeKey) {
      sizeKey = key;
      renderer.setSize(width, height, false);
    }

    const placement = placeCamera(camera, orbit, width / height);
    sky.position.copy(camera.position);
    buildAnimation.apply(progress, time);
    if (isStill || progress !== shadowProgress) {
      shadowProgress = progress;
      renderer.shadowMap.needsUpdate = true;
    }

    const [targetX, , targetZ] = placement.target;
    const [directionX, , directionZ] = placement.direction;
    surroundings.forEach((object) => {
      const facing = ((object.position.x - targetX) * directionX + (object.position.z - targetZ) * directionZ) / placement.distance;
      object.visible = isStill && facing < MAX_FACING_DOT_FOR_STILLS;
    });

    if (isStill && !depthOfFieldFailed) {
      try {
        depthOfField ??= new DepthOfFieldPass(renderer);
        depthOfField.render(scene, camera, width, height, placement.distance);
        return;
      } catch (error) {
        console.error(error);
        depthOfFieldFailed = true;
        renderer.setRenderTarget(null);
      }
    }
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  };

  const dispose = () => {
    depthOfField?.dispose();
    disposeScene(scene);
    renderer.dispose();
    renderer.forceContextLoss();
  };

  return { canvas, render, dispose };
}
