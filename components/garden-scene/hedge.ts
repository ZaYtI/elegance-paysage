import { BoxGeometry, Group, Mesh } from "three";
import { mixRgb } from "./color-utils";
import { createStandardMaterial, enableShadows, type GardenBuilder } from "./garden-builder";
import { foliageColors, type Foliage, type LeafCard, type Vector3Tuple } from "./foliage";

const MIN_X = -4.42;
const MAX_X = -3.98;
const MIN_Z = -3.05;
const MAX_Z = 1.9;
const HEIGHT = 1.45;
const CARD_COUNT = 2300;

export function buildHedge(builder: GardenBuilder, foliage: Foliage) {
  const { random } = builder;
  const { darkGreen, softGreen } = foliageColors;
  const hedge = new Group();
  const cards: LeafCard[] = [];

  const core = enableShadows(new Mesh(new BoxGeometry(1, 1, 1), createStandardMaterial({ color: 0x232b1c })));
  core.position.set((MIN_X + MAX_X) / 2, HEIGHT / 2, (MIN_Z + MAX_Z) / 2);
  core.scale.set(MAX_X - MIN_X - 0.08, HEIGHT - 0.06, MAX_Z - MIN_Z - 0.08);
  hedge.add(core);

  for (let k = 0; k < CARD_COUNT; k++) {
    const face = random();
    const u = random();
    const v = random();
    let point: Vector3Tuple;
    let normal: Vector3Tuple;
    if (face < 0.16) {
      point = [MIN_X + u * (MAX_X - MIN_X), HEIGHT, MIN_Z + v * (MAX_Z - MIN_Z)];
      normal = [0, 1, 0];
    } else if (face < 0.58) {
      point = [MAX_X, v * HEIGHT, MIN_Z + u * (MAX_Z - MIN_Z)];
      normal = [1, 0.15, 0];
    } else if (face < 0.9) {
      point = [MIN_X, v * HEIGHT, MIN_Z + u * (MAX_Z - MIN_Z)];
      normal = [-1, 0.15, 0];
    } else {
      point = [MIN_X + u * (MAX_X - MIN_X), v * HEIGHT, face < 0.95 ? MIN_Z : MAX_Z];
      normal = [0, 0.15, face < 0.95 ? -1 : 1];
    }
    const brightness = (0.6 + 0.4 * (point[1] / HEIGHT)) * (0.75 + 0.5 * random());
    cards.push({
      position: [point[0] + normal[0] * 0.012, point[1] + normal[1] * 0.012, point[2] + normal[2] * 0.012],
      normal: [normal[0] + (random() - 0.5) * 0.9, normal[1] + (random() - 0.5) * 0.9, normal[2] + (random() - 0.5) * 0.9],
      size: 0.11 + random() * 0.07,
      color: mixRgb(darkGreen, softGreen, random(), brightness),
    });
  }

  hedge.add(foliage.createCards(cards));
  builder.shadowBlob((MIN_X + MAX_X) / 2, (MIN_Z + MAX_Z) / 2, 1.4, MAX_Z - MIN_Z + 0.8, null, 0.6, hedge);
  hedge.position.y = 0.03;
  builder.world.add(hedge);
  builder.animate(hedge, 0.62, 0.12, "rise", 0);
}
