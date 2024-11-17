import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type MenuListProps = {
  menuItems: { dishName: string; description: string; course: string; price: number }[];
};

export default function MenuList({ menuItems }: MenuListProps) {
  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item, index) => `${item.dishName}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>{item.dishName} - {item.course}</Text>
          <Text style={styles.menuText}>{item.description}</Text>
          <Text style={styles.menuText}>${item.price.toFixed(2)}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
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
