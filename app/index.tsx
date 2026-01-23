// app/index.tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import Board from '../components/Boadr';
import { LEVELS } from '../utils/levelConfig';

export default function Home() {
  const [level, setLevel] = useState<number>(1);
  const [key, setKey] = useState<number>(0); // new key to force re-render board

  const nextLevel = () => {
    if (level < LEVELS.length) {
      setLevel(level + 1);
      setKey(prev => prev + 1); // force Board to regenerate
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>Number Match Game</Text>
      <Text style={{ textAlign: 'center', marginVertical: 5 }}>Level {level}</Text>
      <Board key={key} level={level} /> {/* Key ensures Board re-renders */}
      <View style={{ marginTop: 10, alignItems: 'center' }}>
        <Button title="Next Level" onPress={nextLevel} />
      </View>
    </View>
  );
}
