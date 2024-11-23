import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Notification = () => {
  const renderItem = () => (
    <View style={styles.notificationContainer}>
      <View style={styles.header}>
        <Ionicons name="notifications-circle-outline" size={24} color="#003399" />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Lorem Ipsum(Title)</Text>
          <Text style={styles.time}>02:21 PM</Text>
        </View>
      </View>
      <Image
        source={require('../../../assets/images/bigsale.jpg')}
        style={styles.image}
      />
      <Text style={styles.description}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Ionicons name="arrow-back" size={24} color="#003399" />
        <Text style={styles.pageTitle}>Messages</Text>
        <Ionicons name="notifications-outline" size={24} color="#003399" />
        <Ionicons name="share-social-outline" size={24} color="#003399" />
      </View>

      <FlatList
        data={[{ id: '1' }, { id: '2' }]} // Dummy data for the list
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003399',
  },
  notificationContainer: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003399',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
