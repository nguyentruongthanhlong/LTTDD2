import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, Alert, ActivityIndicator } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { v4 as uuidv4 } from "uuid";
import { GET_IMG } from "@/api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    loadUserEmailAndCart();
  }, []);

  const loadUserEmailAndCart = async () => {
    try {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
      if (email) {
        fetchCartData(email);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const fetchCartData = async (email) => {
    try {
      setLoading(true);
      const response = await GET_CART(email);
      if (response && response.products) {
        setCartItems(response.products);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      if (error.response?.status === 401) {
        Alert.alert("Thông báo", "Vui lòng đăng nhập l��i");
        navigation.navigate("SignIn");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      if (!userEmail) return;
      await ADD_TO_CART(userEmail, productId, newQuantity);
      fetchCartData(userEmail);
    } catch (error) {
      console.error("Error updating quantity:", error);
      Alert.alert("Lỗi", "Không thể cập nhật số lượng");
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      if (!userEmail) return;
      await REMOVE_FROM_CART(userEmail, productId);
      fetchCartData(userEmail);
    } catch (error) {
      console.error("Error removing item:", error);
      Alert.alert("Lỗi", "Không thể xóa sản phẩm");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image
        style={styles.image}
        source={{ uri: GET_IMG("products/image", item.image) }}
        defaultSource={require("../../../assets/images/dress1.png")}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.productName}</Text>
        <Text style={styles.price}>{item.price?.toLocaleString()} VND</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#001833" />
      </View>
    );
  }

  const totalAmount = cartItems.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
        </View>
      ) : (
        <>
          <SwipeListView
            data={cartItems}
            renderItem={renderItem}
            renderHiddenItem={({ item }) => (
              <View style={styles.hiddenItem}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteItem(item.productId)}
                >
                  <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-75}
            keyExtractor={item => item.productId.toString()}
          />
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Tổng tiền:</Text>
              <Text style={styles.totalAmount}>
                {totalAmount.toLocaleString()} VND
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={() => navigation.navigate("taborder", { totalAmount })}
            >
              <Text style={styles.checkoutText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
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
  headerButton: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
