import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MenuList from '../components/MenuList';
import FilterButtons from '../components/FilterButtons';
import { RootStackParamList } from '../types';

type FilterMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterMenu'>;

export default function FilterMenuScreen({ route }: FilterMenuScreenProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const menuItems = route.params?.menuItems || [];

  const filteredItems = selectedCourse
    ? menuItems.filter((item) => item.course === selectedCourse)
    : menuItems;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      {/* Filter Buttons */}
      <FilterButtons selectedCourse={selectedCourse} onSelect={setSelectedCourse} />

      {/* Filtered Menu List */}
      <MenuList menuItems={filteredItems} />
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
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.8,
  },
});

