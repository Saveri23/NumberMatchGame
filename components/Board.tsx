import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { generateBoard, addRow, Board as BoardType, hasAnyMatch } from '../utils/boardLogic';
import Cell from './Cell';

interface BoardProps {
  level: number;
  addClicks: number;
}

interface SelectedCell {
  row: number;
  col: number;
}

export default function Board({ level, addClicks }: BoardProps) {
  const [board, setBoard] = useState<BoardType>(generateBoard(level));
  const [selected, setSelected] = useState<SelectedCell[]>([]);
  const [highlightedMatches, setHighlightedMatches] = useState<SelectedCell[]>([]);

  // regenerate board when level changes
  useEffect(() => {
    setBoard(generateBoard(level));
    setSelected([]);
    highlightMatches(generateBoard(level));
  }, [level]);

  // add rows when addClicks change
  useEffect(() => {
    if (addClicks > 0) {
      const newBoard = addRow(board, level, addClicks);
      setBoard(newBoard);
      highlightMatches(newBoard);
    }
  }, [addClicks]);

  // Highlight possible matches
  const highlightMatches = (currentBoard: BoardType) => {
    const matches: SelectedCell[] = [];
    const rows = currentBoard.length;
    const cols = currentBoard[0].length;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = currentBoard[r][c];
        if (v === null) continue;

        const neighbors: [number, number][] = [
          [r, (c + 1) % cols], // right
          [(r + 1) % rows, c], // down
          [(r + 1) % rows, (c + 1) % cols], // diagonal
        ];

        for (const [nr, nc] of neighbors) {
          const n = currentBoard[nr][nc];
          if (n !== null && (n === v || n + v === 10)) {
            matches.push({ row: r, col: c });
            matches.push({ row: nr, col: nc });
          }
        }
      }
    }

    setHighlightedMatches(matches);
  };

  const handleCellPress = (row: number, col: number) => {
    if (selected.length === 0) {
      setSelected([{ row, col }]);
      return;
    }

    const first = selected[0];
    const num1 = board[first.row][first.col];
    const num2 = board[row][col];

    if (num1 !== null && num2 !== null) {
      if (num1 === num2 || num1 + num2 === 10) {
        const newBoard = board.map(r => [...r]);
        newBoard[first.row][first.col] = null;
        newBoard[row][col] = null;
        setBoard(newBoard);
        highlightMatches(newBoard); // update highlighted matches
      }
    }

    setSelected([]);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        alignItems: 'center',
      }}
    >
      {board.map((row, rIdx) => (
        <View key={rIdx} style={{ flexDirection: 'row' }}>
          {row.map((cell, cIdx) => (
            <Cell
              key={cIdx}
              value={cell}
              isSelected={selected.some(s => s.row === rIdx && s.col === cIdx)}
              onPress={() => handleCellPress(rIdx, cIdx)}
              highlight={highlightedMatches.some(s => s.row === rIdx && s.col === cIdx)}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
