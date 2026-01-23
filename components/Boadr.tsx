import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { generateBoard, addRow } from '../utils/boardLogic';
import Cell from './Cell';

interface BoardProps {
  level: number;
}

interface SelectedCell {
  row: number;
  col: number;
}

export default function Board({ level }: BoardProps) {
  const [board, setBoard] = useState<number[][]>(generateBoard(level));
  const [addClicks, setAddClicks] = useState<number>(0);
  const [selected, setSelected] = useState<SelectedCell[]>([]);

  const handleCellPress = (row: number, col: number) => {
    if (selected.length === 0) {
      setSelected([{ row, col }]);
    } else if (selected.length === 1) {
      const first = selected[0];
      const num1 = board[first.row][first.col];
      const num2 = board[row][col];

      // Check match
      if (num1 === num2 || num1 + num2 === 10) {
        const newBoard = board.map(r => [...r]);
        newBoard[first.row][first.col] = null as unknown as number;
        newBoard[row][col] = null as unknown as number;
        setBoard(newBoard);
      }
      setSelected([]);
    }
  };

  const handleAddRow = () => {
    if (addClicks < 6) {
      setBoard(prev => addRow(prev, level, addClicks + 1));
      setAddClicks(prev => prev + 1);
    }
  };

  return (
    <ScrollView style={{ padding: 10 }}>
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
      <View style={{ marginTop: 10 }}>
        <Button title={`Add Row (+) [${addClicks}/6]`} onPress={handleAddRow} />
      </View>
    </ScrollView>
  );
}
