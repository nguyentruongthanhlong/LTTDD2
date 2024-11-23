import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Wishlist = () => {
  const renderItem = () => (
    <View style={styles.itemContainer}>
      <Image
        source={require('../../../assets/images/womensummerdress.png')}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Jas Oversized</Text>
        <Text style={styles.description}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Text>
        <Text style={styles.oldPrice}>$8625</Text>
        <Text style={styles.newPrice}>$8625</Text>
        <Text style={styles.discount}>-7%</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="trash-bin-outline" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="cart-outline" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ id: '1' }, { id: '2' }, { id: '3' }]} // Dummy data
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#003399',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  oldPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#666',
  },
  newPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  discount: {
    fontSize: 16,
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});
