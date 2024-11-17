import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<{ dishName: string; description: string; course: string; price: number }[]>([]);

  useEffect(() => {
    if (route.params?.menuItems) {
      setMenuItems(route.params.menuItems);
    }
  }, [route.params?.menuItems]);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef's Menu</Text>
      
      {/*"Add Menu Button" */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AddMenu', { menuItems })}
      >
        <Text style={styles.buttonText}>Add Menu</Text>
      </TouchableOpacity>
      
      {/*"Filter Menu Button" */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('FilterMenu', { menuItems })}
      >
        <Text style={styles.buttonText}>Filter Menu</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Total Items: {menuItems.length}</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFC0CB', //Pink background 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark text 
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#555', 
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
  button: {
    backgroundColor: '#fff', // A darker pink for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000', // 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, 
  },
  buttonText: {
    color: '#333', 
    fontWeight: 'bold',
  },
});


