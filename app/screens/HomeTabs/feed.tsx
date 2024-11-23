import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProductItem from "./Items/ProductItem";
import { GET_ALL, GET_IMG } from "../../../api/apiService";

function HomeScreen({ navigation, route }: { navigation: any; route: any }) {
  const [products, setProducts] = useState([]); // Tất cả sản phẩm
  const [filteredProducts, setFilteredProducts] = useState([]); // Sản phẩm theo danh mục và tìm kiếm
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const [selectedCategory, setSelectedCategory] = useState(null); // Danh mục chọn
  const [searchQuery, setSearchQuery] = useState(""); // Truy vấn tìm kiếm
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const { username } = route.params || {};

  // Lấy danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GET_ALL("categories");
        if (response?.content && Array.isArray(response.content)) {
          setCategories(response.content); // Cập nhật danh mục
        } else {
          console.error("Invalid categories format:", response);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Lấy sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await GET_ALL("products", {
          pageNumber: 0,
          pageSize: 1000, // Sử dụng pageSize thay vì size
        });

        console.log("Full response:", response);

        if (response?.content && Array.isArray(response.content)) {
          setProducts(response.content);
          setFilteredProducts(response.content); // Ban đầu hiển thị tất cả sản phẩm
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts(); // Gọi hàm lấy sản phẩm khi trang được tải
  }, []);

  // Lọc sản phẩm theo danh mục và truy vấn tìm kiếm
  useEffect(() => {
    let filtered = products;

    // Lọc theo danh mục
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) =>
          Number(product.category?.categoryId) === Number(selectedCategory)
      );
    }

    // Lọc theo truy vấn tìm kiếm
    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="menu" size={24} color="#FF7043" />
          </TouchableOpacity>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={24} color="#757575" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for food..."
              placeholderTextColor="#9AA0A6"
              value={searchQuery} // Liên kết giá trị truy vấn tìm kiếm
              onChangeText={setSearchQuery} // Cập nhật truy vấn tìm kiếm
            />
          </View>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color="#FF7043"
            />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>CATEGORIES:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
        >
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === null && styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(null)} // Hiển thị tất cả sản phẩm
          >
            <Text style={styles.categoryText}>All</Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.categoryId}
              style={[
                styles.categoryButton,
                selectedCategory === category.categoryId &&
                  styles.activeCategory,
              ]}
              onPress={() => setSelectedCategory(category.categoryId)}
            >
              <Text style={styles.categoryText}>{category.categoryName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended Section */}
        <View style={styles.productGrid}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#888" />
          ) : (
            filteredProducts.map((product) => (
              <TouchableOpacity
                key={product.productId} // Sử dụng productId làm key duy nhất
                style={styles.productItemContainer}
                onPress={() => navigation.navigate("Details", { product })}
              >
                <ProductItem
                  imageSource={GET_IMG("products/image", product.image)}
                  textContent={product.productName}
                  description={product.description}
                  price={product.price}
                  onAddToCart={(quantity) => {
                    navigation.navigate("cart", {
                      product: { ...product, quantity },
                    });
                  }}
                />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#F8F8F8",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    elevation: 3,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    padding: 10,
    flex: 1,
    marginHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginHorizontal: 15,
    marginTop: 20,
  },
  categoryContainer: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  activeCategory: {
    backgroundColor: "#FF7043",
  },
  categoryText: {
    fontSize: 16,
    color: "#757575",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  productItemContainer: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    marginHorizontal: "1%",
  },
});

export default HomeScreen;
