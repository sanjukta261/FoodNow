import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { API_ENDPOINTS } from '../config/api';
import NavBar from '../component/NavBar';
import css from '../component/css';

const AddItemStaff = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    prepTime: '',
    image: 'https://via.placeholder.com/200x100',
    availability: true,
    rating: 0,
    canteen: 'A Block'
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ADD_ITEM, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Item added successfully!');
        setFormData({
          name: '',
          description: '',
          price: '',
          quantity: '',
          category: '',
          prepTime: '',
          image: 'https://via.placeholder.com/200x100',
          availability: true,
          rating: 0,
          canteen: 'A Block'
        });
      } else {
        Alert.alert('Error', 'Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert('Error', 'Failed to add item');
    }
  };

  return (
    <View style={css.pageContainer}>
      <NavBar pageTitle="Add New Item" />
      <ScrollView style={css.pageContent}>
        <Text style={[css.header, { color: "#041C4D" }]}>Add New Menu Item</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Item name"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Item description"
            multiline
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Price (₹)</Text>
          <TextInput
            style={styles.input}
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
            placeholder="Price"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={formData.quantity}
            onChangeText={(text) => setFormData({ ...formData, quantity: text })}
            placeholder="Quantity"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            value={formData.category}
            onChangeText={(text) => setFormData({ ...formData, category: text })}
            placeholder="Category"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Preparation Time</Text>
          <TextInput
            style={styles.input}
            value={formData.prepTime}
            onChangeText={(text) => setFormData({ ...formData, prepTime: text })}
            placeholder="e.g., 15-20 mins"
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Add Item</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = {
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#102E50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default AddItemStaff;