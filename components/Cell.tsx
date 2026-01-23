import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface CellProps {
  value: number;
  onPress: () => void;
  isSelected: boolean;
}

export default function Cell({ value, onPress, isSelected }: CellProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 35,
        height: 35,
        margin: 2,
        backgroundColor: isSelected ? '#4caf50' : '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#999',
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{value}</Text>
    </TouchableOpacity>
  );
}
