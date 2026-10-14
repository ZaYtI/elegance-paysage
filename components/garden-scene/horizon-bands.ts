import { ClampToEdgeWrapping, Color, CylinderGeometry, DoubleSide, Mesh, MeshBasicMaterial, RepeatWrapping } from "three";
import type { GardenBuilder } from "./garden-builder";
import { HORIZON_COLOR } from "./sky-and-lights";
import { createCanvasTexture, type DrawTexture } from "./textures";

type BandSpec = {
  radius: number;
  height: number;
  hazeAmount: number;
  layer: number;
  repeat: number;
};

const BANDS: BandSpec[] = [
  { radius: 27, height: 7.5, hazeAmount: 0.22, layer: 3, repeat: 3 },
  { radius: 42, height: 10, hazeAmount: 0.42, layer: 2, repeat: 4 },
  { radius: 64, height: 13, hazeAmount: 0.64, layer: 1, repeat: 5 },
];

function drawTreeline(random: () => number): DrawTexture {
  return (context, width, height) => {
    context.clearRect(0, 0, width, height);
    try {
      context.filter = "blur(1.6px)";
    } catch {
      context.filter = "none";
    }
    let x = -30;
    while (x < width + 30) {
      const treeWidth = 16 + random() * 52;
      const treeHeight = height * (0.28 + random() * 0.5);
      const value = (205 + random() * 50) | 0;
      context.fillStyle = `rgb(${value},${value},${value})`;
      for (let k = 0; k < 8; k++) {
        context.beginPath();
        context.arc(
          x + (random() - 0.5) * treeWidth,
          height - treeHeight * (0.3 + random() * 0.7),
          treeWidth * (0.3 + random() * 0.42),
          0,
          6.3,
        );
        context.fill();
      }
      context.fillRect(x - treeWidth * 0.6, height - treeHeight * 0.5, treeWidth * 1.2, treeHeight * 0.5);
      x += treeWidth * (0.5 + random() * 0.5);
    }
    context.fillStyle = "#e8e8e8";
    context.fillRect(0, height * 0.8, width, height * 0.2);
  };
}

export function addHorizonBands(builder: GardenBuilder): Mesh[] {
  const horizon = new Color(HORIZON_COLOR);
  return BANDS.map((band) => {
    const texture = createCanvasTexture(2048, 256, drawTreeline(builder.random));
    texture.wrapS = RepeatWrapping;
    texture.wrapT = ClampToEdgeWrapping;
    texture.repeat.set(band.repeat, 1);
    const mesh = new Mesh(
      new CylinderGeometry(band.radius, band.radius, band.height, 160, 1, true),
      new MeshBasicMaterial({
        map: texture,
        color: new Color(0x6c8a48).lerp(horizon, band.hazeAmount),
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
        fog: false,
      }),
    );
    mesh.position.y = band.height / 2 - 0.4;
    mesh.renderOrder = band.layer - 8;
    builder.scene.add(mesh);
    return mesh;
  });
}
