import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { LOGIN, REGISTER } from "../../api/apiService";

const SigninScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
      return;
    }
    try {
      const response = await LOGIN({ email: username, password });
      if (response?.data) {
        Alert.alert("Thành công", "Đăng nhập thành công!");
        navigation.navigate("Home");
      }
    } catch (error) {
      setErrorMessage("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/login-bg 2.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/e-commerce-logo 1.png')}
          style={styles.logo}
        />

        <Text style={styles.label}>Username</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#FFF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Type here username"
            placeholderTextColor="#FFF"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#FFF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Type here your password"
            placeholderTextColor="#FFF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Animated.View style={[styles.loginButton, { transform: [{ scale }] }]}>
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleLogin}
            style={styles.loginButtonTouchable}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.footerText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerText}>Forget Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  label: {
    color: "#003366",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "flex-start",
    marginLeft: 25,
    marginBottom: 5,
  },
  inputContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#87CEFA",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#FFF",
  },
  loginButton: {
    backgroundColor: "#003366",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 5,
  },
  loginButtonTouchable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    width: "80%",
  },
  footerText: {
    color: "#003366",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 14,
    marginTop: 5,
  },
});

export default SigninScreen;
