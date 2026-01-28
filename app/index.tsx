import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Board from '../components/Board';
import Timer from '../components/Timer';
import { LEVELS } from '../utils/levelConfig';

export default function Index() {
  const [level, setLevel] = useState<number>(1);
  const [key, setKey] = useState<number>(0); // force re-render board
  const [addClicks, setAddClicks] = useState<number>(0);

  const nextLevel = () => {
    if (level < LEVELS.length) {
      setLevel(level + 1);
      setKey(prev => prev + 1);
      setAddClicks(0);
    }
  };

  const handleAddRow = () => {
    if (addClicks < 6) {
      setAddClicks(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Number Match Game</Text>
      <Text style={styles.levelText}>Level {level}</Text>

      {/* Timer */}
      <Timer targetTime={LEVELS[level - 1].targetTime} level={level} />

      {/* Board */}
      <View style={styles.boardWrapper}>
        <Board key={key} level={level} addClicks={addClicks} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <Button
          title={`Add Row (+) [${addClicks}/6]`}
          onPress={handleAddRow}
        />
        <View style={{ width: 20 }} />
        <Button title="Next Level" onPress={nextLevel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  levelText: {
    textAlign: 'center',
    marginVertical: 5,
  },
  boardWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
