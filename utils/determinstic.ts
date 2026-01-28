// utils/deterministic.ts
export function deterministicNumber(level: number, index: number): number {
  // deterministic, no RNG
  return ((level * 31 + index * 17) % 9) + 1;
}
