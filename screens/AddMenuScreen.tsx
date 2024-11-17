import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const courses = ['Starters', 'Mains', 'Desserts'];

type AddMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'AddMenu'>;

export default function AddMenuScreen({ navigation, route }: AddMenuScreenProps) {
  // Initialize with existing items or with an empty array
  const [menuItems, setMenuItems] = useState(
    route.params?.menuItems || [] // Sync with HomeScreen in case items exist
  );
  const [removedItems, setRemovedItems] = useState<typeof menuItems>([]); // Track removed items

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');

  // Add new item to the array
  const handleAddItem = () => {
    if (dishName && description && price) {
      const newItem = { dishName, description, course, price: parseFloat(price) };
      setMenuItems((prevItems) => [...prevItems, newItem]);
      setDishName('');
      setDescription('');
      setPrice('');
    }
  };

  // Remove an item by index
  const handleRemoveItem = (index: number) => {
    const removedItem = menuItems[index];
    setMenuItems((prevItems) => prevItems.filter((_, i) => i !== index));
    setRemovedItems((prevRemovedItems) => [...prevRemovedItems, removedItem]);
  };

  // Undo last removed item
  const handleUndoRemove = () => {
    if (removedItems.length > 0) {
      const lastRemoved = removedItems[removedItems.length - 1];
      setRemovedItems((prevRemovedItems) => prevRemovedItems.slice(0, -1));
      setMenuItems((prevItems) => [...prevItems, lastRemoved]);
    }
  };

  // Save changes and clear undo history
  const handleSaveChanges = () => {
    setRemovedItems([]); // Clear removed items history after saving
    navigation.navigate('Home', { menuItems });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Menu Items</Text>

      {/* Input fields for adding new items */}
      <Text style={styles.label}>Dish Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDishName}
        value={dishName}
        placeholder="Enter dish name"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Enter description"
      />

      <Text style={styles.label}>Course:</Text>
      <Picker selectedValue={course} onValueChange={setCourse}>
        {courses.map((course) => (
          <Picker.Item key={course} label={course} value={course} />
        ))}
      </Picker>

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPrice}
        value={price}
        keyboardType="numeric"
        placeholder="Enter price"
      />

      <Button title="Add Dish" onPress={handleAddItem} />

      {/* List of items with remove functionality */}
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>
              {item.dishName} - {item.course} - ${item.price.toFixed(2)}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveItem(index)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Undo Remove Button */}
      {removedItems.length > 0 && (
        <TouchableOpacity style={styles.undoButton} onPress={handleUndoRemove}>
          <Text style={styles.undoButtonText}>Undo Remove</Text>
        </TouchableOpacity>
      )}

      <Button title="Save Changes" onPress={handleSaveChanges} />
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
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
  },
  removeButton: {
    color: 'red',
    fontSize: 16,
  },
  undoButton: {
    backgroundColor: '#FF1493',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  undoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});




