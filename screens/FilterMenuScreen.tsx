import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type FilterMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterMenu'>;

export default function FilterMenuScreen({ route }: FilterMenuScreenProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Retrieve the menu items from the route params
  const menuItems = route.params?.menuItems || [];

  // Filter the menu items based on the selected course
  const filteredItems = selectedCourse
    ? menuItems.filter((item) => item.course === selectedCourse)
    : menuItems;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      {/* Filter Buttons */}
      <View style={styles.filterButtons}>
        <TouchableOpacity
          style={[styles.button, selectedCourse === 'Starters' && styles.selectedButton]}
          onPress={() => setSelectedCourse('Starters')}
        >
          <Text style={styles.buttonText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedCourse === 'Mains' && styles.selectedButton]}
          onPress={() => setSelectedCourse('Mains')}
        >
          <Text style={styles.buttonText}>Mains</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedCourse === 'Desserts' && styles.selectedButton]}
          onPress={() => setSelectedCourse('Desserts')}
        >
          <Text style={styles.buttonText}>Desserts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !selectedCourse && styles.selectedButton]}
          onPress={() => setSelectedCourse(null)}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
      </View>

      {/* Filtered Items List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => `${item.dishName}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>
              {item.dishName} - {item.course}
            </Text>
            <Text style={styles.menuText}>{item.description}</Text>
            <Text style={styles.menuText}>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFC0CB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.8,
  },
  filterButtons: {
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
  menuItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});
