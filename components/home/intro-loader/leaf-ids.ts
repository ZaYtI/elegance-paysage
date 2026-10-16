export function leafGradientId(scope: string, fill: string) {
  return `leaf-gradient-${scope}-${fill.slice(1)}`;
}

export function leafSymbolId(scope: string, variant: number) {
  return `leaf-symbol-${scope}-${variant}`;
}
