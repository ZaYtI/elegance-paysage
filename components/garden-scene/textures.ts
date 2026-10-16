import { CanvasTexture, ClampToEdgeWrapping, RepeatWrapping, SRGBColorSpace, type Texture } from "three";
import type { RandomSource } from "./noise";

const FULL_CIRCLE = 6.3;

export type DrawTexture = (context: CanvasRenderingContext2D, width: number, height: number) => void;

export type GardenTextures = {
  grain: Texture;
  strata: Texture;
  stone: Texture;
  wood: Texture;
  woodVertical: Texture;
  bark: Texture;
  leaf: Texture;
  shadowBlob: Texture;
  fencingMesh: Texture;
};

export function createCanvasTexture(width: number, height: number, draw: DrawTexture): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("2D canvas context unavailable");
  draw(context, width, height);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

function drawSpeckles(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  random: RandomSource,
  count: number,
  lowest: number,
  highest: number,
  alpha: number,
) {
  for (let i = 0; i < count; i++) {
    const value = (lowest + random() * (highest - lowest)) | 0;
    context.fillStyle = `rgba(${value},${value},${value},${alpha * (0.4 + random() * 0.6)})`;
    context.beginPath();
    context.arc(random() * width, random() * height, 0.5 + random() * 2.2, 0, FULL_CIRCLE);
    context.fill();
  }
}

function drawGrain(random: RandomSource): DrawTexture {
  return (context, width, height) => {
    context.fillStyle = "#cdcdcd";
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < 160; i++) {
      const value = (160 + random() * 80) | 0;
      context.fillStyle = `rgba(${value},${value},${value},0.2)`;
      context.beginPath();
      context.ellipse(random() * width, random() * height, 10 + random() * 40, 8 + random() * 26, random() * 3, 0, FULL_CIRCLE);
      context.fill();
    }
    drawSpeckles(context, width, height, random, 9000, 100, 255, 0.5);
  };
}

function drawStrata(random: RandomSource): DrawTexture {
  return (context, width, height) => {
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#2e241b");
    gradient.addColorStop(0.2, "#41372d");
    gradient.addColorStop(0.45, "#5a4a3c");
    gradient.addColorStop(0.75, "#6c5d4f");
    gradient.addColorStop(1, "#5f5144");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < 90; i++) {
      const red = (70 + random() * 60) | 0;
      const green = (56 + random() * 46) | 0;
      const blue = (44 + random() * 36) | 0;
      context.fillStyle = `rgba(${red},${green},${blue},0.28)`;
      context.beginPath();
      context.ellipse(random() * width, 40 + random() * (height - 40), 12 + random() * 46, 3 + random() * 9, (random() - 0.5) * 0.3, 0, FULL_CIRCLE);
      context.fill();
    }
    for (let i = 0; i < 60; i++) {
      const value = (130 + random() * 60) | 0;
      context.fillStyle = `rgba(${value},${value - 8},${value - 20},0.8)`;
      context.beginPath();
      context.ellipse(random() * width, height * 0.45 + random() * height * 0.55, 2 + random() * 6, 1.5 + random() * 3.5, random() * 3, 0, FULL_CIRCLE);
      context.fill();
    }
    context.strokeStyle = "rgba(30,22,15,0.5)";
    for (let i = 0; i < 24; i++) {
      let x = random() * width;
      let y = 0;
      context.lineWidth = 0.6 + random() * 1.2;
      context.beginPath();
      context.moveTo(x, y);
      for (let step = 0; step < 5; step++) {
        x += (random() - 0.5) * 16;
        y += 6 + random() * 12;
        context.lineTo(x, y);
      }
      context.stroke();
    }
    drawSpeckles(context, width, height, random, 5000, 20, 150, 0.3);
  };
}

function drawStone(random: RandomSource): DrawTexture {
  return (context, width, height) => {
    context.fillStyle = "#e4e0d8";
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < 40; i++) {
      const value = (200 + random() * 45) | 0;
      context.fillStyle = `rgba(${value},${value - 3},${value - 10},0.3)`;
      context.beginPath();
      context.ellipse(random() * width, random() * height, 14 + random() * 40, 8 + random() * 22, random() * 3, 0, FULL_CIRCLE);
      context.fill();
    }
    drawSpeckles(context, width, height, random, 2400, 130, 250, 0.35);
  };
}

function drawWood(random: RandomSource): DrawTexture {
  return (context, width, height) => {
    context.fillStyle = "#d6d0c6";
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < 170; i++) {
      context.strokeStyle =
        random() > 0.5
          ? `rgba(80,62,44,${0.08 + random() * 0.26})`
          : `rgba(255,250,240,${0.1 + random() * 0.25})`;
      context.lineWidth = 0.5 + random() * 1.8;
      const y = random() * height;
      context.beginPath();
      context.moveTo(0, y);
      context.bezierCurveTo(width * 0.3, y + (random() - 0.5) * 7, width * 0.7, y + (random() - 0.5) * 7, width, y + (random() - 0.5) * 4);
      context.stroke();
    }
  };
}

function drawBark(random: RandomSource): DrawTexture {
  return (context, width, height) => {
    context.fillStyle = "#b9ae9f";
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < 160; i++) {
      context.strokeStyle =
        random() > 0.5
          ? `rgba(40,30,22,${0.2 + random() * 0.4})`
          : `rgba(235,225,210,${0.15 + random() * 0.3})`;
      context.lineWidth = 0.6 + random() * 2.4;
      const x = random() * width;
      const y = random() * height;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + (random() - 0.5) * 6, y + 20 + random() * 70);
      context.stroke();
    }
  };
}

function drawLeaves(random: RandomSource): DrawTexture {
  return (context, width, height) => {
    for (let i = 0; i < 7; i++) {
      const angle = random() * FULL_CIRCLE;
      const distance = i ? 14 + random() * 24 : 0;
      const length = 44 + random() * 22;
      const halfWidth = 15 + random() * 8;
      const value = (180 + random() * 75) | 0;
      context.save();
      context.translate(width / 2 + Math.cos(angle) * distance, height / 2 + Math.sin(angle) * distance);
      context.rotate(random() * FULL_CIRCLE);
      context.beginPath();
      context.moveTo(0, -length / 2);
      context.quadraticCurveTo(halfWidth, -length * 0.05, 0, length / 2);
      context.quadraticCurveTo(-halfWidth, -length * 0.05, 0, -length / 2);
      context.closePath();
      context.fillStyle = `rgb(${value},${value},${value})`;
      context.fill();
      context.strokeStyle = "rgba(0,0,0,0.15)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, -length / 2);
      context.lineTo(0, length / 2);
      context.stroke();
      context.restore();
    }
  };
}

const drawShadowBlob: DrawTexture = (context, width, height) => {
  const gradient = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
  gradient.addColorStop(0, "rgba(0,0,0,0.7)");
  gradient.addColorStop(0.55, "rgba(0,0,0,0.38)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
};

const drawFencingMesh: DrawTexture = (context, width, height) => {
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#ffffff";
  for (let k = 0; k < 20; k++) context.fillRect(k * 12.8, 0, 2.4, height);
  for (let k = 0; k < 5; k++) context.fillRect(0, k * 51.2, width, 2.4);
  context.fillRect(0, 98, width, 2.4);
  context.fillRect(0, 105, width, 2.4);
};

export function createGardenTextures(random: RandomSource): GardenTextures {
  const grain = createCanvasTexture(512, 512, drawGrain(random));
  const strata = createCanvasTexture(512, 256, drawStrata(random));
  const stone = createCanvasTexture(256, 256, drawStone(random));
  const wood = createCanvasTexture(256, 256, drawWood(random));
  const woodVertical = createCanvasTexture(256, 256, drawWood(random));
  woodVertical.rotation = Math.PI / 2;
  const bark = createCanvasTexture(128, 256, drawBark(random));
  const leaf = createCanvasTexture(128, 128, drawLeaves(random));
  leaf.wrapS = leaf.wrapT = ClampToEdgeWrapping;
  const shadowBlob = createCanvasTexture(256, 256, drawShadowBlob);
  const fencingMesh = createCanvasTexture(256, 256, drawFencingMesh);
  return { grain, strata, stone, wood, woodVertical, bark, leaf, shadowBlob, fencingMesh };
}
