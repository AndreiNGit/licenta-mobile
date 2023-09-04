import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {ScrollView, View, Text, TouchableOpacity } from 'react-native';

const API_URL = 'http://172.20.10.2:8080';

function CategoriesScreen({ navigation }) {
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      console.log(API_URL + '/api/category');
      axios.get(API_URL + '/api/category')
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    return (
      <ScrollView style={{ padding: 20 }}>
        {categories.map(category => (
          <View key={category.id} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{category.name}</Text>
            {category.stocks.map(stock => (
              <TouchableOpacity
                key={stock.id}
                onPress={() => navigation.navigate('Stock', { symbol: stock.symbol })}
                style={{ padding: 10, backgroundColor: '#ddd', marginTop: 10 }}
              >
                <Text>{stock.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView >
    );
  }

    export default CategoriesScreen;