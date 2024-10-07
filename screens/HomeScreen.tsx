import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<{ dishName: string, description: string, course: string, price: number }[]>([]);

  useEffect(() => {
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [...prevItems, route.params.newItem as { dishName: string; description: string; course: string; price: number }]);
    }
  }, [route.params?.newItem]);

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/pisa-negra.jpg')} // Make sure the file is in the correct path
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.4 }} // Adjust the opacity for blending
      >
        <View style={styles.container}>
          <Text style={styles.title}>Chef's Menu</Text>

          {/* Add Menu Button */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddMenu')}>
            <Text style={styles.buttonText}>Add Menu</Text>
          </TouchableOpacity>

          {/* Filter Menu Button */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FilterMenu')}>
            <Text style={styles.buttonText}>Filter Menu</Text>
          </TouchableOpacity>

          {/* Total Items Display */}
          <Text style={styles.totalItems}>Total Items: {menuItems.length}</Text>

          {/* Menu Items List */}
          <FlatList
            data={menuItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.menuItem}>
                <Text style={styles.menuText}>{item.dishName} - {item.course}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
                <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFC0CB', // Pink background
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensure the image covers the screen
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center', // Centering items horizontally
    backgroundColor: 'rgba(255, 192, 203, 0.6)', // Pink background with transparency
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff', // White text to contrast the background
    marginBottom: 30,
    textAlign: 'center',
  },
  totalItems: {
    fontSize: 18,
    color: '#fff', // White text for contrast
    marginBottom: 20,
    textAlign: 'center',
  },
  menuItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
    padding: 20,
    marginVertical: 10,
    borderRadius: 15, // Rounded corners for a card-like effect
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    alignItems: 'center',
  },
  menuText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  menuDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  menuPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E91E63', // Bright pink for price
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff', // White button background
    padding: 15,
    borderRadius: 5, // Rounded corners for buttons
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // Button shadow (Android)
    width: '70%', // Set the button width to 90% of the screen width
    alignItems: 'center', // Center the text inside the button
  },
  buttonText: {
    fontSize: 18,
    color: '#333', // Dark text for contrast
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
