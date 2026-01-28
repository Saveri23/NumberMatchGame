import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface TimerProps {
  targetTime: number; // in seconds
  level: number;
}

export default function Timer({ targetTime, level }: TimerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 100 / targetTime;
      });
    }, 1000); // increase progress every second

    return () => clearInterval(interval);
  }, [level, targetTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Level {level} Progress</Text>
      <View style={styles.barBackground}>
        <View style={[styles.barForeground, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.time}>{Math.min(Math.round((progress / 100) * targetTime), targetTime)}s / {targetTime}s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 10,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  barBackground: {
    width: '100%',
    height: 15,
    backgroundColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  barForeground: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  time: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
  },
});
