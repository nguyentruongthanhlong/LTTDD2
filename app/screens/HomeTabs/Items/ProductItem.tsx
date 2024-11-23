import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface ProductItemProps {
  imageSource: string;
  textContent: string;
  description: string;
  price: number;
  onAddToCart: (quantity: number) => void; // Cập nhật hàm để nhận quantity
}

const ProductItem: React.FC<ProductItemProps> = ({
  imageSource,
  textContent,
  description,
  price,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1); // Thêm state cho số lượng

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    onAddToCart(quantity); // Gọi hàm onAddToCart với quantity
  };

  return (
    <View style={styles.productContainer}>
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: imageSource }} style={styles.productImage} />

      {/* Thông tin sản phẩm */}
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1} ellipsizeMode="tail">
          {textContent}
        </Text>
        <Text style={styles.productDescription} numberOfLines={2} ellipsizeMode="tail">
          {description}
        </Text>
        <Text style={styles.productPrice}>{price.toLocaleString()} $</Text>
      </View>

      {/* Nút thêm vào giỏ hàng */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Icon name="add-circle" size={24} color="#FF4500" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    alignItems: "center",
    position: "relative",  // Để đặt vị trí nút thêm vào giỏ hàng
  },
  productImage: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
    alignItems: "center",
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    maxWidth: "90%",
    textAlign: "center",
  },
  productDescription: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF4500",
    marginBottom: 4,
  },
  quantityButton: {
    marginVertical: 10,
    backgroundColor: "#FFDDDD", // Màu nền cho nút tăng số lượng
    borderRadius: 8,
    padding: 5,
  },
  quantityText: {
    fontSize: 20,
    color: "#333333",
  },
  addButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default ProductItem;
