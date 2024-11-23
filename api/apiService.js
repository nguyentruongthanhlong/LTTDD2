import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';

// Tạo một instance axios với cấu hình cơ bản
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/public",
});

// Hàm gọi API
async function callApi(endpoint: string, method = "GET", body?: any, params?: any) {
    const token = await AsyncStorage.getItem("authToken");
    const queryString = params ? new URLSearchParams(params).toString() : "";
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    const config = {
        method,
        url,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
        },
        data: body ? JSON.stringify(body) : null,
    };

    return axiosInstance(config)
        .then((response) => response.data)
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized. Redirecting to login.");
                // Xử lý trường hợp không có quyền truy cập
            } else {
                console.error("API call error:", error);
            }
            throw error;
        });
}

// Các hàm API
export const GET_ALL = (endpoint: string, params?: any) => {
    console.log("Calling API with endpoint:", endpoint);
    return callApi(endpoint, "GET", null, params);
};

export const GET_ID = (endpoint: string, id: number) => {
    return callApi(`${endpoint}/${id}`, "GET");
};

export const POST_ADD = (endpoint: string, data: any) => {
    return callApi(endpoint, "POST", data);
};

export const PUT_EDIT = (endpoint: string, data: any) => {
    return callApi(endpoint, "PUT", data);
};

export const DELETE_ID = (endpoint: string) => {
    return callApi(endpoint, "DELETE");
};

export const GET_IMG = (endpoint: string, imgName: string) => {
    const imageURL = `http://localhost:8080/api/public/${endpoint}/${imgName}`;
    console.log("Generated Image URL: ", imageURL);
    return imageURL;
};

// Hàm đăng nhập
export async function LOGIN(body: { email: string; password: string }) {
    const API_URL_LOGIN = "http://localhost:8080/api/login";

    try {
        const response = await axios.post(API_URL_LOGIN, body, {
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            const token = response.data.token || response.data["jwt-token"];
            if (token) {
                await AsyncStorage.setItem("authToken", token);
            } else {
                console.error("Token not found in response");
            }
        } else {
            console.error("Login failed with status:", response.status);
        }
        return response;
    } catch (error) {
        console.log("Login error:", error);
        throw error;
    }
}

// Hàm đăng ký
export async function REGISTER(data: any, navigate: any) {
    const API_URL_REGISTER = "http://localhost:8080/api/register";

    const payload = {
        userId: 0,
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNumber: data.mobileNumber,
        email: data.email,
        password: data.password,
        roles: [{ roleId: 0, roleName: data.roleName || "USER" }],
        address: {
            addressId: 0,
            street: data.street || "Default Street",
            buildingName: data.buildingName || "Default Building",
            city: data.city || "Default City",
            state: data.state || "Default State",
            country: data.country || "Default Country",
            pincode: data.pincode || "000000",
        },
        cart: {
            cartId: 0,
            totalPrice: 0,
            products: [{
                productId: 0,
                productName: "Default Product",
                image: "default.png",
                description: "Default Description",
                quantity: 1,
                price: 0,
                discount: 0,
                specialPrice: 0,
                categoryId: 0,
            }],
        },
    };

    try {
        const response = await axios.post(API_URL_REGISTER, payload, {
            headers: { "Content-Type": "application/json" },
        });

        Alert.alert("Success", "Registration successful!");
        navigate("SignIn"); // Sử dụng navigation để chuyển hướng
        return { success: true, message: response.data.message || "Registration successful" };
    } catch (error) {
        const message = error.response?.data?.message || "Registration failed. Please try again.";
        Alert.alert("Error", message);
        return { success: false, message };
    }
}

// Hàm tìm kiếm sản phẩm
export function searchProducts(keyword: string) {
    return callApi(`/products/search?keyword=${keyword}`, "GET");
}

// Thêm các hàm API cart
export const GET_CART = async (emailId) => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
            throw new Error("Chưa đăng nhập");
        }

        console.log("Getting cart for email:", emailId);
        
        // Sửa lại đường dẫn API đầy đủ
        const response = await axios.get(`http://localhost:8080/api/public/users/${emailId}/carts/0`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        
        console.log("Cart response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in GET_CART:", error);
        throw error;
    }
};

// Thêm sản phẩm vào giỏ hàng
export const ADD_TO_CART = async (emailId, productId, quantity) => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
            throw new Error("Chưa đăng nhập");
        }

        const response = await axios.post(
            `http://localhost:8080/api/public/users/${emailId}/carts/0/products/${productId}?quantity=${quantity}`,
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        
        console.log("Add to cart response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
};

// Xóa sản phẩm khỏi giỏ hàng
export const REMOVE_FROM_CART = async (emailId, productId) => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
            throw new Error("Chưa đăng nhập");
        }

        const response = await axios.delete(
            `http://localhost:8080/api/public/users/${emailId}/carts/0/products/${productId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        
        return response.data;
    } catch (error) {
        console.error("Error removing from cart:", error);
        throw error;
    }
};
