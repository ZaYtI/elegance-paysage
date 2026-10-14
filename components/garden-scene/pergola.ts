import type { GardenBuilder } from "./garden-builder";
import type { BuildMaterials } from "./materials";

export function buildPergola(builder: GardenBuilder, materials: BuildMaterials) {
  [-3.65, -1.0].forEach((x) => {
    [-1.0, 1.65].forEach((z) => {
      builder.box(x, 1.5, z, 0.13, 2.85, 0.13, materials.woodPost, 0.48 + (x + 4) * 0.01);
    });
    builder.box(x, 2.95, 0.33, 0.18, 0.2, 3.0, materials.woodBeam, 0.55);
  });
  for (let i = 0; i < 8; i++) {
    builder.box(-2.33, 3.1, -1.02 + i * 0.4, 3.05, 0.12, 0.12, materials.wood, 0.56 + i * 0.008);
  }
  [-3.65, -1.0].forEach((x) => {
    [-1.0, 1.65].forEach((z) => builder.shadowBlob(x, z, 0.75, 0.75, 0.48, 0.45));
  });
}
