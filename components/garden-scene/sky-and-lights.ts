import {
  BackSide,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  Fog,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  PMREMGenerator,
  Scene,
  SphereGeometry,
  type WebGLRenderer,
} from "three";

export const HORIZON_COLOR = 0xdfe2cf;
const ZENITH_COLOR = 0x8db8d6;
const SUNSET_GLOW_COLOR = 0xf4dfb4;
const SKY_RADIUS = 200;

export type SkyAndLights = {
  sky: Mesh;
  fog: Fog;
};

function createSky(): Mesh {
  const geometry = new SphereGeometry(SKY_RADIUS, 40, 24);
  const positions = geometry.attributes.position;
  const horizon = new Color(HORIZON_COLOR);
  const zenith = new Color(ZENITH_COLOR);
  const glow = new Color(SUNSET_GLOW_COLOR);
  const color = new Color();
  const colors: number[] = [];

  for (let k = 0; k < positions.count; k++) {
    const x = positions.getX(k);
    const y = positions.getY(k);
    const z = positions.getZ(k);
    const height = Math.max(0, y / SKY_RADIUS);
    const t = Math.min(1, height / 0.28);
    const zenithBlend = t * t * (3 - 2 * t);
    const horizontalLength = Math.hypot(x, z) || 1;
    const sunSide = Math.pow(Math.max(0, (-x * 0.7 + z * 0.7) / horizontalLength), 5);
    const glowBlend = sunSide * (1 - zenithBlend) * 0.55;
    color.copy(horizon).lerp(zenith, zenithBlend).lerp(glow, glowBlend);
    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  const sky = new Mesh(
    geometry,
    new MeshBasicMaterial({ vertexColors: true, side: BackSide, fog: false, depthWrite: false }),
  );
  sky.renderOrder = -10;
  return sky;
}

function createSun(): DirectionalLight {
  const sun = new DirectionalLight(0xffe2ba, 4.0);
  sun.position.set(-8, 14, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const shadowCamera = sun.shadow.camera;
  shadowCamera.left = -8.5;
  shadowCamera.right = 8.5;
  shadowCamera.top = 8.5;
  shadowCamera.bottom = -8.5;
  shadowCamera.near = 2;
  shadowCamera.far = 40;
  shadowCamera.updateProjectionMatrix();
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.03;
  sun.shadow.radius = 5;
  return sun;
}

function createEnvironmentSphere(): Mesh {
  const radius = 50;
  const geometry = new SphereGeometry(radius, 32, 16);
  const positions = geometry.attributes.position;
  const top = new Color(0xa9b6c0);
  const horizon = new Color(0xded4bd);
  const ground = new Color(0x4d5638);
  const color = new Color();
  const colors: number[] = [];

  for (let k = 0; k < positions.count; k++) {
    const y = positions.getY(k) / radius;
    if (y >= 0) color.copy(horizon).lerp(top, Math.pow(y, 0.6));
    else color.copy(horizon).lerp(ground, Math.min(1, -y * 6));
    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  return new Mesh(geometry, new MeshBasicMaterial({ vertexColors: true, side: BackSide }));
}

function applyEnvironment(renderer: WebGLRenderer, scene: Scene) {
  const environmentScene = new Scene();
  const environmentSphere = createEnvironmentSphere();
  environmentScene.add(environmentSphere);
  const generator = new PMREMGenerator(renderer);
  scene.environment = generator.fromScene(environmentScene, 0.04).texture;
  generator.dispose();
  environmentSphere.geometry.dispose();
  (environmentSphere.material as MeshBasicMaterial).dispose();
}

export function addSkyAndLights(renderer: WebGLRenderer, scene: Scene): SkyAndLights {
  const sky = createSky();
  scene.add(sky);

  scene.add(new HemisphereLight(0xeef3f5, 0x8a8066, 0.95));
  scene.add(createSun());

  try {
    applyEnvironment(renderer, scene);
  } catch {
    scene.environment = null;
  }

  const fill = new DirectionalLight(0xc8d2dc, 0.45);
  fill.position.set(8, 5, -6);
  scene.add(fill);

  return { sky, fog: new Fog(HORIZON_COLOR, 26, 95) };
}
