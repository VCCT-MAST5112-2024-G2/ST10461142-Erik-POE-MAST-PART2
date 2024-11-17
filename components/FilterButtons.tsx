import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type FilterButtonsProps = {
  selectedCourse: string | null;
  onSelect: (course: string | null) => void;
};

export default function FilterButtons({ selectedCourse, onSelect }: FilterButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, selectedCourse === 'Starters' && styles.selectedButton]}
        onPress={() => onSelect('Starters')}
      >
        <Text style={styles.buttonText}>Starters</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedCourse === 'Mains' && styles.selectedButton]}
        onPress={() => onSelect('Mains')}
      >
        <Text style={styles.buttonText}>Mains</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedCourse === 'Desserts' && styles.selectedButton]}
        onPress={() => onSelect('Desserts')}
      >
        <Text style={styles.buttonText}>Desserts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, !selectedCourse && styles.selectedButton]}
        onPress={() => onSelect(null)}
      >
        <Text style={styles.buttonText}>All</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF69B4',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#FF1493',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
