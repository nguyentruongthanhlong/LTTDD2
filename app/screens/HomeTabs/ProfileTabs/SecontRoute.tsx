// Cart.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { v4 as uuidv4 } from "uuid";
import { GET_IMG } from "@/api/apiService";

const SecontRoute = ({ route, navigation }) => {
  const [coffeeData, setCoffeeData] = useState([]);

  useEffect(() => {
    if (route.params && route.params.product) {
      console.log("Received product data:", route.params.product);
      handleAddCoffee(route.params.product);
    } else {
      console.log("No product data received");
    }
  }, [route.params]);

  const handleAddCoffee = (coffee) => {
    if (coffee) {
      const existingCoffee = coffeeData.find((item) => item.id === coffee.id);

      if (existingCoffee) {
        // If product exists in cart, update quantity
        setCoffeeData((prevData) =>
          prevData.map((item) =>
            item.id === existingCoffee.id
              ? { ...item, quantity: item.quantity + coffee.quantity }
              : item
          )
        );
      } else {
        const newCoffee = {
          ...coffee,
          key: uuidv4(), // Add a unique key for each item
        };
        setCoffeeData((prevData) => [...prevData, newCoffee]); // Add coffee to coffeeData
      }
    }
  };

  const handleDeleteCoffee = (key) => {
    setCoffeeData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const handleNext = () => {
    const totalSum = coffeeData.reduce(
      (sum, coffee) =>
        sum + parseFloat(coffee.price) * parseInt(coffee.quantity, 10),
      0
    );
    navigation.navigate("Details", { coffeeData, totalSum });
  };

  const totalSum = coffeeData.reduce((sum, coffee) => {
    const price = parseFloat(coffee.price) || 0; // Ensure price is a number
    const quantity = parseInt(coffee.quantity, 10) || 0; // Ensure quantity is an integer
    return sum + price * quantity;
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>My order</Text>
      </View>

      <View style={styles.content}>
        <SwipeListView
          data={coffeeData}
          renderItem={(data) => {
            const imageUri = data.item.photo
              ? GET_IMG("products", data.item.photo)
              : require("../../../../assets/images/dress1.png"); // Use require directly if there's no URL

            return (
              <View style={styles.Productitem}>
                <Image
                  style={styles.image}
                  source={{ uri: imageUri }}
                  resizeMode="cover"
                  onError={() =>
                    console.log(`Error loading image for ${data.item.title}`)
                  }
                />
                <View style={styles.Details}>
                  <Text style={styles.name}>{data.item.title}</Text>
                  <Text style={styles.totalAmount}>
                    {(
                      parseFloat(data.item.price) *
                      parseInt(data.item.quantity, 10)
                    ).toFixed(2)}
                    đ
                  </Text>
                  <Text style={styles.description}>
                    {data.item.description}
                  </Text>
                  <Text style={styles.quantity}>x{data.item.quantity}</Text>
                </View>
              </View>
            );
          }}
          renderHiddenItem={(data) => (
            <View style={styles.hiddenItem}>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleDeleteCoffee(data.item.key)}
              >
                <AntDesign name="delete" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-75}
          keyExtractor={(item) => item.key}
        />
      </View>

      <View style={styles.bottom}>
        <View style={styles.price}>
          <Text style={styles.totalPrice}>Total Price</Text>
          <Text style={styles.totalAmount}>
            {totalSum.toLocaleString()} VND
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Ionicons name="cart-outline" size={25} color="#FFF" />
          <Text style={styles.next}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecontRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 4,
    paddingHorizontal: 10,
  },
  Productitem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  Details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#999",
  },
  quantity: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
  hiddenItem: {
    alignItems: "flex-end",
    backgroundColor: "#ff5e5e",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 100,
    borderRadius: 10,
  },
  removeButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ff5e5e",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 16,
    color: "#333",
  },
  price: {
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#001833",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  next: {
    color: "#FFF",
    fontSize: 18,
    marginLeft: 10,
  },
});
