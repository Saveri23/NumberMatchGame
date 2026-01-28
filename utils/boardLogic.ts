import { LEVELS } from './levelConfig';
import { deterministicNumber } from './determinstic';

export type Board = (number | null)[][];

/**
 * Generate initial deterministic board (3 rows)
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
  const guaranteedPairs = Math.floor(
    (totalCells * config.matchDensity) / 2
  );

  for (let i = 0; i < guaranteedPairs; i++) {
    const num = deterministicNumber(level, seed++);
    placePair(board, num, 10 - num);
  }

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
 * Add Row logic with rescue + straggler cleanup
 */
export function addRow(
  board: Board,
  level: number,
  addClickCount: number
): Board {
  const newRow: Board[number] = Array(9).fill(null);

  const needsRescue =
    addClickCount >= 2 && !hasAnyMatch(board);

  const lonely = findSingleCellValue(board);

  if (needsRescue && lonely !== null) {
    newRow[4] = lonely;
    newRow[5] = 10 - lonely;
  } else if (needsRescue) {
    newRow[4] = 5;
    newRow[5] = 5;
  } else {
    const base = deterministicNumber(level, addClickCount);
    newRow[4] = base;
    newRow[5] = 10 - base;
  }

  for (let i = 0; i < 9; i++) {
    if (newRow[i] === null) {
      newRow[i] = deterministicNumber(level, i + addClickCount);
    }
  }

  return [...board, newRow];
}

/* ---------------- HELPERS ---------------- */

function placePair(board: Board, a: number, b: number) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length - 1; c++) {
      if (board[r][c] === null && board[r][c + 1] === null) {
        board[r][c] = a;
        board[r][c + 1] = b;
        return;
      }
    }
  }
}

function hasAnyMatch(board: Board): boolean {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      const v = board[r][c];
      if (v === null) continue;

      // right
      if (c + 1 < 9) {
        const n = board[r][c + 1];
        if (n !== null && (n === v || n + v === 10)) {
          return true;
        }
      }

      // down
      if (r + 1 < board.length) {
        const n = board[r + 1][c];
        if (n !== null && (n === v || n + v === 10)) {
          return true;
        }
      }
    }
  }
  return false;
}

function findSingleCellValue(board: Board): number | null {
  for (const row of board) {
    const nums = row.filter((v): v is number => v !== null);
    if (nums.length === 1) return nums[0];
  }
  return null;
}
