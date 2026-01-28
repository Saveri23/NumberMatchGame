import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { generateBoard, addRow, Board as BoardType } from '../utils/boardLogic';
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

  // regenerate board when level changes
  useEffect(() => {
    setBoard(generateBoard(level));
    setSelected([]);
  }, [level]);

  // add rows when addClicks change
  useEffect(() => {
    if (addClicks > 0) {
      setBoard(prev => addRow(prev, level, addClicks));
    }
  }, [addClicks]);

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
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
