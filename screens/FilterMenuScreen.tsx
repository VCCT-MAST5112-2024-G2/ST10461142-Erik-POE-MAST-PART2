import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type FilterMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterMenu'>;

export default function FilterMenuScreen({ navigation }: FilterMenuScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>
      {/* You can add your filtering functionality here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFC0CB', // Pink background (same as HomeScreen)
  },
  title: {
    fontSize: 28, // Same size as HomeScreen title
    fontWeight: 'bold',
    color: '#333', // Dark gray text (same as HomeScreen)
    marginBottom: 20,
    fontFamily: 'Arial', // Same font as HomeScreen (adjust if you want a custom font)
  },
});