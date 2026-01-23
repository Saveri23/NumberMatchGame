// boardLogic.ts

import { LEVELS } from './levelConfig';

export type Board = number[][];

/**
 * Generate the initial deterministic board
 */
export function generateBoard(level: number): Board {
  const { matchDensity } = LEVELS[level - 1];
  const rows = 3;
  const cols = 9;
  const board: Board = Array.from({ length: rows }, () => Array(cols).fill(0));

  const totalCells = rows * cols;
  const matchesToPlace = Math.floor((totalCells * matchDensity) / 2);

  // Place guaranteed matches
  for (let i = 0; i < matchesToPlace; i++) {
    const num = Math.ceil(Math.random() * 9);
    const positions = getTwoEmptyPositions(board);
    board[positions[0].row][positions[0].col] = num;
    board[positions[1].row][positions[1].col] = 10 - num; // sum to 10 match
  }

  // Fill remaining cells with decoys
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 0) board[r][c] = Math.ceil(Math.random() * 9);
    }
  }

  return board;
}

/**
 * Add a new row deterministically
 */
export function addRow(board: Board, level: number, addRowClickCount: number): Board {
  const cols = 9;
  const newRow: number[] = Array(cols).fill(0);

  // Determine number of helpful matches (max 3 per row)
  const helperMatches = Math.min(addRowClickCount, 3);
  for (let i = 0; i < helperMatches; i++) {
    const num = Math.ceil(Math.random() * 9);
    const pos1 = getEmptyIndex(newRow);
    const pos2 = getEmptyIndex(newRow);
    newRow[pos1] = num;
    newRow[pos2] = 10 - num;
  }

  // Fill remaining cells with decoys
  for (let i = 0; i < cols; i++) {
    if (newRow[i] === 0) newRow[i] = Math.ceil(Math.random() * 9);
  }

  board.push(newRow);
  return board;
}

/**
 * Pick two empty positions on the board
 */
function getTwoEmptyPositions(board: Board): { row: number; col: number }[] {
  const empty: { row: number; col: number }[] = [];
  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === 0) empty.push({ row: r, col: c });
    });
  });
  return empty.sort(() => 0.5 - Math.random()).slice(0, 2);
}

/**
 * Pick a random empty index in a row
 */
function getEmptyIndex(row: number[]): number {
  const emptyIndices = row.map((v, i) => (v === 0 ? i : -1)).filter(i => i >= 0);
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}
