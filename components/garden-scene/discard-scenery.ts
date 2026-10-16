import type { Mesh, Object3D } from "three";

export function discardScenery(objects: Object3D[]) {
  objects.forEach((object) => {
    object.removeFromParent();
    object.traverse((child) => {
      (child as Mesh).geometry?.dispose();
    });
  });
}
