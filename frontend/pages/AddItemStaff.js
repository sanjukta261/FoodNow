import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { API_ENDPOINTS } from '../config/api';
import NavBar from '../component/NavBar';
import css from '../component/css';
import foodItems from '../data/foodItems';

const AddItemStaff = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    prepTime: '',
    image: '',
    availability: true,
    rating: 0,
    canteen: 'A Block'
  });

  const categories = ["Featured", "Roll", "Samosa", "Beverages"];

  const handleSubmit = async () => {
    if (!formData.image) {
      Alert.alert('Error', 'Please select an image for the item');
      return;
    }

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
          image: '',
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

  const renderImageOption = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.imageOption,
        formData.image === item.image.uri && styles.selectedImageOption
      ]}
      onPress={() => setFormData({ ...formData, image: item.image.uri })}
    >
      <Image
        source={item.image}
        style={styles.imagePreview}
        resizeMode="cover"
      />
      <Text style={styles.imageOptionText} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

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
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  formData.category === category && styles.selectedCategory
                ]}
                onPress={() => setFormData({ ...formData, category })}
              >
                <Text style={[
                  styles.categoryButtonText,
                  formData.category === category && styles.selectedCategoryText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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

        <View style={styles.formGroup}>
          <Text style={styles.label}>Select Image</Text>
          <FlatList
            data={foodItems}
            renderItem={renderImageOption}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageList}
          />
        </View>

        {formData.image && (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Selected Image Preview</Text>
            <Image
              source={{ uri: formData.image }}
              style={styles.selectedImagePreview}
              resizeMode="cover"
            />
          </View>
        )}

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
  imageList: {
    marginVertical: 10,
  },
  imageOption: {
    marginRight: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 5,
  },
  selectedImageOption: {
    borderColor: '#102E50',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imageOptionText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  selectedImagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#102E50',
  },
  categoryButtonText: {
    color: '#333',
  },
  selectedCategoryText: {
    color: 'white',
  },
};

export default AddItemStaff;