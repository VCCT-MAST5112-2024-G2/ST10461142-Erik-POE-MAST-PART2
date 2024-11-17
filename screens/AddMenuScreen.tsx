import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const courses = ['Starters', 'Mains', 'Desserts'];

type AddMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'AddMenu'>;

export default function AddMenuScreen({ navigation, route }: AddMenuScreenProps) {
  // Initialize with existing items or an empty array
  const [menuItems, setMenuItems] = useState(
    route.params?.menuItems || [] // Sync with HomeScreen if items exist
  );

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
    setMenuItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Save changes and feauture
  const handleSaveChanges = () => {
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

      {/*Remove functionality */}
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
});



