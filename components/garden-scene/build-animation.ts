import type { Group, MeshStandardMaterial, PointLight } from "three";
import type { AnimatedElement } from "./garden-builder";
import type { GrassUniforms } from "./grass";
import { terrainPalette, type Terrain } from "./terrain";
import type { SwayingCanopy } from "./trees";

export type BuildAnimationParts = {
  terrain: Terrain;
  rocks: Group;
  animated: AnimatedElement[];
  gateLeaves: Group[];
  lamps: PointLight[];
  bulbMaterial: MeshStandardMaterial;
  grassUniforms: GrassUniforms;
  canopies: SwayingCanopy[];
};

const GROUND_STAGE_END = 0.36;

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const smoothstep = (t: number) => t * t * (3 - 2 * t);

function updateTerrain(parts: BuildAnimationParts, progress: number) {
  const { terrain } = parts;
  const { positions, colors } = terrain;
  const palette = terrainPalette;
  const deckAmount = smoothstep(clamp01((progress - 0.085) / 0.03));
  const mulchAmount = smoothstep(clamp01((progress - 0.27) / 0.05));

  for (let k = 0; k < terrain.waves.length; k++) {
    const wave = terrain.waves[k];
    const levelling = smoothstep(clamp01((progress - 0.045 * wave) / 0.035));
    const noiseLarge = terrain.noiseLarge[k];
    const noiseFine = terrain.noiseFine[k];
    const roughShade = 0.78 + noiseFine * 0.42;
    const weedAmount = noiseLarge > 0.5 ? (noiseLarge - 0.5) * 1.8 : 0;
    positions[k * 3 + 1] = terrain.roughHeights[k] + (terrain.gentleHeights[k] - terrain.roughHeights[k]) * levelling;

    let r = (palette.rough[0] + (palette.weed[0] - palette.rough[0]) * weedAmount) * roughShade;
    let g = (palette.rough[1] + (palette.weed[1] - palette.rough[1]) * weedAmount) * roughShade;
    let b = (palette.rough[2] + (palette.weed[2] - palette.rough[2]) * weedAmount) * roughShade;

    const levelShade = 0.9 + noiseFine * 0.2;
    r += (palette.level[0] * levelShade - r) * levelling;
    g += (palette.level[1] * levelShade - g) * levelling;
    b += (palette.level[2] * levelShade - b) * levelling;

    const zone = terrain.zones[k];
    const finish = zone === 1 ? palette.lawn : zone === 2 ? palette.deck : palette.mulch;
    const finishAmount =
      zone === 1 ? smoothstep(clamp01((progress - 0.03 - 0.06 * wave) / 0.05)) : zone === 2 ? deckAmount : mulchAmount;
    r += (finish[0] * levelShade - r) * finishAmount;
    g += (finish[1] * levelShade - g) * finishAmount;
    b += (finish[2] * levelShade - b) * finishAmount;

    colors[k * 3] = r;
    colors[k * 3 + 1] = g;
    colors[k * 3 + 2] = b;
  }

  terrain.groundGeometry.attributes.position.needsUpdate = true;
  terrain.groundGeometry.attributes.color.needsUpdate = true;
  terrain.groundGeometry.computeVertexNormals();
  terrain.sideEdges.forEach((edge, n) => {
    terrain.wallPositions[n * 6 + 1] = positions[edge.vertexIndex * 3 + 1];
  });
  terrain.wallGeometry.attributes.position.needsUpdate = true;

  const rubble = 1 - smoothstep(clamp01((progress - 0.01) / 0.05));
  parts.rocks.visible = rubble > 0.01;
  parts.rocks.scale.set(1, Math.max(0.001, rubble), 1);
  parts.rocks.position.y = -(1 - rubble) * 0.2;
}

function updateAnimatedElements(elements: AnimatedElement[], progress: number) {
  for (const element of elements) {
    const { object } = element;
    const t = clamp01((progress - element.start) / (element.duration * 1.35));
    const eased = easeOutCubic(t);
    const overshootT = t - 1;
    const overshoot = 1 + 2.3 * overshootT * overshootT * overshootT + 1.3 * overshootT * overshootT;
    object.visible = t > 0;
    if (!object.visible) continue;
    object.position.y = element.baseY + (1 - eased) * element.drop;
    if (element.mode === "grow") {
      const scale = Math.max(0.001, overshoot);
      object.scale.set(element.baseScaleXZ * scale, element.baseScaleY * scale, element.baseScaleXZ * scale);
    } else {
      object.scale.y = element.baseScaleY * Math.max(0.001, element.drop ? 0.4 + 0.6 * eased : eased);
    }
  }
}

function updateApronColor(terrain: Terrain, progress: number) {
  const amount = smoothstep(clamp01((progress - 0.03) / 0.12));
  const { apronRough, apronLevelled } = terrainPalette;
  terrain.apronMaterial.color.setRGB(
    apronRough[0] + (apronLevelled[0] - apronRough[0]) * amount,
    apronRough[1] + (apronLevelled[1] - apronRough[1]) * amount,
    apronRough[2] + (apronLevelled[2] - apronRough[2]) * amount,
  );
}

export function createBuildAnimation(parts: BuildAnimationParts) {
  let lastProgress = -1;

  const apply = (progress: number, time: number) => {
    parts.grassUniforms.progress.value = progress;
    parts.grassUniforms.time.value = time;

    if (progress !== lastProgress) {
      const needsTerrainUpdate = lastProgress < 0 || progress < GROUND_STAGE_END || lastProgress < GROUND_STAGE_END;
      lastProgress = progress;
      if (needsTerrainUpdate) updateTerrain(parts, progress);
      updateAnimatedElements(parts.animated, progress);

      const gateOpening = smoothstep(clamp01((progress - 0.9) / 0.1)) * 1.05;
      parts.gateLeaves.forEach((leaf) => {
        leaf.rotation.y = leaf.userData.direction * gateOpening;
      });
      updateApronColor(parts.terrain, progress);
      const glow = smoothstep(clamp01((progress - 0.9) / 0.08));
      parts.bulbMaterial.emissiveIntensity = glow * 1.8;
      parts.lamps.forEach((lamp) => {
        lamp.intensity = glow * 1.6;
      });
    }

    parts.canopies.forEach(({ canopy, phase }) => {
      canopy.rotation.z = Math.sin(time * 0.9 + phase) * 0.014;
      canopy.rotation.x = Math.sin(time * 0.7 + phase * 1.7) * 0.01;
    });
  };

  return { apply };
}
