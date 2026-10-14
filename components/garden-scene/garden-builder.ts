import {
  BoxGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  type Material,
  type MeshStandardMaterialParameters,
  type Object3D,
  type Scene,
} from "three";
import type { RandomSource } from "./noise";
import type { GardenTextures } from "./textures";

export type AnimationMode = "rise" | "grow";

export type AnimatedElement = {
  object: Object3D;
  start: number;
  duration: number;
  mode: AnimationMode;
  drop: number;
  baseY: number;
  baseScaleY: number;
  baseScaleXZ: number;
};

export function createStandardMaterial(parameters: MeshStandardMaterialParameters): MeshStandardMaterial {
  return new MeshStandardMaterial({ roughness: 0.9, metalness: 0, ...parameters });
}

export function enableShadows<T extends Mesh>(mesh: T): T {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export class GardenBuilder {
  readonly world = new Group();
  readonly animated: AnimatedElement[] = [];
  private readonly roundedBoxes = new Map<string, BoxGeometry>();
  private readonly shadowMaterial: MeshBasicMaterial;
  private readonly shadowGeometry = new PlaneGeometry(1, 1);

  constructor(
    readonly scene: Scene,
    readonly random: RandomSource,
    readonly textures: GardenTextures,
  ) {
    this.scene.add(this.world);
    this.shadowMaterial = new MeshBasicMaterial({
      map: textures.shadowBlob,
      transparent: true,
      depthWrite: false,
      opacity: 0.55,
      toneMapped: false,
    });
  }

  animate(object: Object3D, start: number, duration = 0.07, mode: AnimationMode = "rise", drop = 0.6) {
    object.visible = false;
    this.animated.push({
      object,
      start,
      duration,
      mode,
      drop,
      baseY: object.position.y,
      baseScaleY: object.scale.y,
      baseScaleXZ: object.scale.x,
    });
    return object;
  }

  box(
    x: number,
    y: number,
    z: number,
    sizeX: number,
    sizeY: number,
    sizeZ: number,
    material: Material,
    start: number | null,
    rotationY = 0,
    parent: Object3D = this.world,
  ) {
    const radius = Math.min(0.022, Math.min(sizeX, sizeY, sizeZ) * 0.2);
    const mesh = enableShadows(new Mesh(this.roundedBox(sizeX, sizeY, sizeZ, radius), material));
    mesh.position.set(x, y, z);
    if (rotationY) mesh.rotation.y = rotationY;
    parent.add(mesh);
    if (start !== null) this.animate(mesh, start);
    return mesh;
  }

  shadowBlob(
    x: number,
    z: number,
    sizeX: number,
    sizeZ: number,
    start: number | null,
    opacity?: number,
    parent?: Object3D,
  ) {
    const material = opacity ? this.shadowMaterial.clone() : this.shadowMaterial;
    if (opacity) material.opacity = opacity;
    const mesh = new Mesh(this.shadowGeometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, 0.07, z);
    mesh.scale.set(sizeX, sizeZ, 1);
    mesh.renderOrder = 2;
    (parent ?? this.world).add(mesh);
    if (!parent && start !== null) this.animate(mesh, start, 0.08, "grow", 0);
    return mesh;
  }

  private roundedBox(width: number, height: number, depth: number, radius: number): BoxGeometry {
    const key = [width.toFixed(3), height.toFixed(3), depth.toFixed(3), radius.toFixed(4)].join(",");
    const cached = this.roundedBoxes.get(key);
    if (cached) return cached;
    const geometry = createRoundedBoxGeometry(width, height, depth, radius);
    this.roundedBoxes.set(key, geometry);
    return geometry;
  }
}

function createRoundedBoxGeometry(width: number, height: number, depth: number, radius: number): BoxGeometry {
  const geometry = new BoxGeometry(width, height, depth, 5, 5, 5);
  const positions = geometry.attributes.position;
  const normals = geometry.attributes.normal;
  const halfSize = [width / 2, height / 2, depth / 2];

  const pushToCorner = (coordinate: number, half: number) => {
    const ratio = Math.abs(coordinate) / half;
    const sign = coordinate < 0 ? -1 : 1;
    return sign * (ratio < 0.4 ? half - radius : ratio < 0.8 ? half - radius * 0.3 : half);
  };

  for (let k = 0; k < positions.count; k++) {
    const pushed = [
      pushToCorner(positions.getX(k), halfSize[0]),
      pushToCorner(positions.getY(k), halfSize[1]),
      pushToCorner(positions.getZ(k), halfSize[2]),
    ];
    const inner = pushed.map((c, i) => Math.max(-halfSize[i] + radius, Math.min(halfSize[i] - radius, c)));
    const offset = pushed.map((c, i) => c - inner[i]);
    const length = Math.hypot(offset[0], offset[1], offset[2]);
    if (length > 1e-7) {
      positions.setXYZ(
        k,
        inner[0] + (offset[0] / length) * radius,
        inner[1] + (offset[1] / length) * radius,
        inner[2] + (offset[2] / length) * radius,
      );
      normals.setXYZ(k, offset[0] / length, offset[1] / length, offset[2] / length);
    } else {
      positions.setXYZ(k, pushed[0], pushed[1], pushed[2]);
    }
  }
  return geometry;
}
