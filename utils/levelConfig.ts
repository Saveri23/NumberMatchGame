// levelConfig.ts

export interface LevelConfig {
  level: number;
  targetTime: number;      // in seconds, not actual timer
  matchDensity: number;    // fraction of cells that are immediately matchable
  addRowClicks: number;    // ideal number of Add Row (+) clicks to complete
}

export const LEVELS: LevelConfig[] = [
  { level: 1, targetTime: 45, matchDensity: 0.7, addRowClicks: 1 },
  { level: 2, targetTime: 60, matchDensity: 0.65, addRowClicks: 1 },
  { level: 3, targetTime: 90, matchDensity: 0.6, addRowClicks: 2 },
  { level: 4, targetTime: 120, matchDensity: 0.55, addRowClicks: 2 },
  { level: 5, targetTime: 150, matchDensity: 0.5, addRowClicks: 3 },
  { level: 6, targetTime: 90, matchDensity: 0.6, addRowClicks: 2 },  // Relief level
  { level: 7, targetTime: 180, matchDensity: 0.45, addRowClicks: 3 },
  { level: 8, targetTime: 200, matchDensity: 0.4, addRowClicks: 3 },
  { level: 9, targetTime: 220, matchDensity: 0.35, addRowClicks: 4 },
  { level: 10, targetTime: 250, matchDensity: 0.3, addRowClicks: 4 }
];
