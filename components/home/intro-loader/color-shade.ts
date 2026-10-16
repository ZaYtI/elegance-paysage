function channel(hex: string, offset: number) {
  return parseInt(hex.slice(offset, offset + 2), 16);
}

export function shadeHex(hex: string, amount: number) {
  const target = amount < 0 ? 0 : 255;
  const strength = Math.abs(amount);
  const mixed = [1, 3, 5].map((offset) => Math.round(channel(hex, offset) + (target - channel(hex, offset)) * strength));
  return `#${mixed.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}
