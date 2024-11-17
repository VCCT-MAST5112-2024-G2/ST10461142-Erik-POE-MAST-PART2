import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateAverageByCourse, calculateTotalAveragePrice } from '../utils/calculateAverages';

type AveragePricesProps = {
  menuItems: { dishName: string; description: string; course: string; price: number }[];
};

export default function AveragePrices({ menuItems }: AveragePricesProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Average Price by Course:</Text>
      <Text style={styles.text}>Starters: ${calculateAverageByCourse(menuItems, 'Starters')}</Text>
      <Text style={styles.text}>Mains: ${calculateAverageByCourse(menuItems, 'Mains')}</Text>
      <Text style={styles.text}>Desserts: ${calculateAverageByCourse(menuItems, 'Desserts')}</Text>
      <Text style={styles.totalText}>Total Average: ${calculateTotalAveragePrice(menuItems)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
});
