import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Alert,
  Pressable,
} from "react-native";
import { GET_IMG, POST_ADD, ADD_TO_CART } from "@/api/apiService";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScreenDetail = ({ navigation, route }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0)); // For animation
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState(0); // Thêm state cho cartId

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy thông tin sản phẩm.</Text>
      </View>
    );
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Animation for the details section
  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Trigger animation when the component mounts
  React.useEffect(() => {
    startAnimation();
  }, []);

  const imageOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Hàm thêm vào giỏ hàng
  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const userEmail = await AsyncStorage.getItem("userEmail"); // Thêm lưu email khi đăng nhập
      
      if (!token || !userEmail) {
        Alert.alert("Thông báo", "Vui lòng đăng nhập để thêm vào giỏ hàng");
        navigation.navigate("SignIn");
        return;
      }

      // Gọi API thêm vào giỏ hàng
      await ADD_TO_CART(cartId, product.id, quantity);

      Alert.alert(
        "Thành công",
        "Đã thêm sản phẩm vào giỏ hàng",
        [
          {
            text: "Tiếp tục mua sắm",
            style: "cancel"
          },
          {
            text: "Xem giỏ hàng",
            onPress: () => navigation.navigate("Cart")
          }
        ]
      );

    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#230C02" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="heart-outline" size={24} color="#FF5252" />
        </TouchableOpacity>
      </View>

      {/* Product Image with Animation */}
      <Animated.Image
        source={GET_IMG("products/image", product.image)}
        style={[styles.productImage, { opacity: imageOpacity }]} // Apply opacity animation
        onError={() => setImageError(true)}
        resizeMode="cover" // Ensure the image covers the area
      />

      {imageError && (
        <Image
          source={require("../../assets/images/dress1.png")}
          style={styles.productImage}
        />
      )}

      {/* Product Detail Card */}
      <Animated.View style={[styles.detailCard, { opacity: imageOpacity }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.category}>{product.categoryTitle}</Text>
        </View>

        <Text style={styles.productName}>{product.productName}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        {/* Rating */}
        <View style={styles.rating}>
          <MaterialCommunityIcons name="star" size={24} color="#FFD700" />
          <Text style={styles.ratingText}>4.5</Text>
          <Text style={styles.reviewText}>(10k)</Text>
        </View>

        {/* Price */}
        <Text style={styles.price}>
          {product.price}$
        </Text>

        {/* giá được tổng tiền khi cộng thêm */}
        <Text style={styles.price}>
          {(product.price * quantity).toFixed(2)}$
        </Text>

        {/* Quantity Picker & Add to Cart */}
        <View style={styles.cartSection}>
          <View style={styles.quantityPicker}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecrease}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrease}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.addToCartButton,
              isLoading && styles.disabledButton,
              pressed && { opacity: 0.7 }
            ]}
            onPress={handleAddToCart}
            disabled={isLoading}
          >
            <Text style={styles.addToCartText}>
              {isLoading ? "ĐANG XỬ LÝ..." : "THÊM VÀO GIỎ HÀNG"}
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

// Các style đã được tối ưu
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    zIndex: 1, // To ensure header is above other elements
  },
  productImage: {
    width: "100%",
    height: 400, // Set a fixed height for the image
    borderRadius: 8,
    marginBottom: -20, // Overlap the card slightly with the image
    elevation: 5, // Shadow effect for Android
    shadowColor: "#000", // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    paddingBottom: 30,
    position: "absolute",
    width: "100%",
    height: "auto", // Let it adjust based on content
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10, // Shadow effect for Android
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    color: "#333333",
    fontSize: 22,
    fontWeight: "bold",
  },
  productName: {
    color: "#333333",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  productDescription: {
    color: "#666666",
    fontSize: 16,
    marginTop: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  ratingText: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  reviewText: {
    color: "#666666",
    fontSize: 14,
    marginLeft: 5,
  },
  price: {
    color: "#333333",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  cartSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  quantityPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "#333333",
    fontSize: 20,
  },
  quantityValue: {
    color: "#333333",
    fontSize: 20,
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: "#FF5252",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.7,
    backgroundColor: '#999',
  },
});

export default ScreenDetail;
