import { LEVELS } from './levelConfig';
import { deterministicNumber } from './determinstic';

export type Board = (number | null)[][];

interface Match {
  row: number;
  col: number;
}

/**
 * Generate initial deterministic board (3 rows)
 * Includes diagonal and wrap-around matching
 */
export function generateBoard(level: number): Board {
  const config = LEVELS[level - 1];
  const rows = 3;
  const cols = 9;

  const board: Board = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );

  let seed = 0;
  const totalCells = rows * cols;
  const guaranteedPairs = Math.floor((totalCells * config.matchDensity) / 2);

  // Place guaranteed pairs
  for (let i = 0; i < guaranteedPairs; i++) {
    const num = deterministicNumber(level, seed++);
    placePair(board, num, 10 - num);
  }

  // Fill remaining cells
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === null) {
        board[r][c] = deterministicNumber(level, seed++);
      }
    }
  }

  return board;
}

/**
 * Add Row logic with improved rescue + straggler cleanup + decoys
 */
export function addRow(board: Board, level: number, addClickCount: number): Board {
  const newRow: Board[number] = Array(9).fill(null);
  const config = LEVELS[level - 1];

  // Determine if rescue is needed
  const needsRescue = addClickCount >= 2 && !hasAnyMatch(board);

  // Find lonely cell for straggler cleanup
  const lonely = findSingleCellValue(board);

  if (needsRescue && lonely !== null) {
    // Inject a guaranteed match in the middle
    newRow[4] = lonely;
    newRow[5] = 10 - lonely;
  } else if (needsRescue) {
    newRow[4] = 5;
    newRow[5] = 5;
  } else {
    // Inject one guaranteed match based on level
    const base = deterministicNumber(level, addClickCount);
    newRow[4] = base;
    newRow[5] = 10 - base;
  }

  // Fill remaining cells with decoys deterministically
  for (let i = 0; i < 9; i++) {
    if (newRow[i] === null) {
      newRow[i] = deterministicNumber(level, i + addClickCount + 10); // offset seed
    }
  }

  return [...board, newRow];
}

/* ---------------- HELPERS ---------------- */

function placePair(board: Board, a: number, b: number) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === null) {
        // Try to place horizontal pair
        if (c + 1 < 9 && board[r][c + 1] === null) {
          board[r][c] = a;
          board[r][c + 1] = b;
          return;
        }
        // Try vertical pair
        if (r + 1 < board.length && board[r + 1][c] === null) {
          board[r][c] = a;
          board[r + 1][c] = b;
          return;
        }
        // Try diagonal pair
        if (r + 1 < board.length && c + 1 < 9 && board[r + 1][c + 1] === null) {
          board[r][c] = a;
          board[r + 1][c + 1] = b;
          return;
        }
        // Wrap-around horizontal
        if (c === 8 && board[r][0] === null) {
          board[r][c] = a;
          board[r][0] = b;
          return;
        }
        // Wrap-around vertical
        if (r === board.length - 1 && board[0][c] === null) {
          board[r][c] = a;
          board[0][c] = b;
          return;
        }
      }
    }
  }
}

// Check for any match in board (horizontal, vertical, diagonal, wrap)
export function hasAnyMatch(board: Board): boolean {
  const rows = board.length;
  const cols = board[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = board[r][c];
      if (v === null) continue;

      const neighbors: [number, number][] = [
        [r, (c + 1) % cols], // right (wrap)
        [(r + 1) % rows, c], // down (wrap)
        [(r + 1) % rows, (c + 1) % cols], // diagonal
      ];

      for (const [nr, nc] of neighbors) {
        const n = board[nr][nc];
        if (n !== null && (n === v || n + v === 10)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Find lonely cell (straggler)
function findSingleCellValue(board: Board): number | null {
  for (const row of board) {
    const nums = row.filter((v): v is number => v !== null);
    if (nums.length === 1) return nums[0];
  }
  return null;
}
