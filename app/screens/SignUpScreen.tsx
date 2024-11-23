import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  Animated,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { REGISTER } from "../../api/apiService";

const backgroundImage = require("../../assets/images/login-bg 2.png");

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("USER");
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const scale = new Animated.Value(1);

  const roleOptions = ["ADMIN", "USER"];

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

  const handleSignUp = async () => {
    if (!lastName || !firstName || !email || !password || !phone || !street) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }

    const data = {
      firstName,
      lastName,
      mobileNumber: phone,
      email,
      password,
      roleName: roles,
      street,
      buildingName: "Default Building",
      city: "Default City",
      state: "Default State",
      country: "Default Country",
      pincode: "000000",
    };

    try {
      await REGISTER(data, navigation.navigate);
    } catch (error) {
      Alert.alert("Registration Failed", "Something went wrong, please try again.");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <MaterialCommunityIcons name="arrow-left" color={"#171810"} size={30} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" size={24} color="#FFF" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#FFF"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={24} color="#FFF" />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#FFF"
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={24} color="#FFF" />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#FFF"
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={24} color="#FFF" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#FFF"
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="domain" size={24} color="#FFF" />
          <TextInput
            style={styles.input}
            placeholder="Street"
            placeholderTextColor="#FFF"
            onChangeText={setStreet}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="phone" size={24} color="#FFF" />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#FFF"
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />
        </View>

        {/* Custom Role Selector */}
        <TouchableOpacity style={styles.roleSelector} onPress={() => setModalVisible(true)}>
          <Text style={styles.roleSelectorText}>{roles}</Text>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#FFF" />
        </TouchableOpacity>

        {/* Modal for Role Selection */}
        <Modal
          visible={isModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <FlatList
                data={roleOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalOption}
                    onPress={() => {
                      setRoles(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalOptionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <Animated.View style={[styles.signUpButton, { transform: [{ scale }] }]}>
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleSignUp}
            style={styles.signUpButtonTouchable}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.footerText}>Log in</Text>
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
  header: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#f53333",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#58a8f6",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#FFF",
    fontSize: 16,
  },
  roleSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#58a8f6",
    borderRadius: 15,
    paddingHorizontal: 15,
    width: "90%",
    height: 50,
    marginBottom: 15,
  },
  roleSelectorText: {
    color: "#FFF",
    fontSize: 16,
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 18,
    color: "#333",
  },
  signUpButton: {
    backgroundColor: "#003366",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 5,
  },
  signUpButtonTouchable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
  },
  footerText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default SignUpScreen;
