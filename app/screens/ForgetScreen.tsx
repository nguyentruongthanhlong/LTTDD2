import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Path to the background image (Make sure this path is correct for your project)
const backgroundImage = require("../../assets/images/login-bg 2.png");

const ForgetScreen = ({ navigation }: { navigation: any }) => {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover" // Ensures the background image covers the entire screen
    >
      {/* Header containing the back arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <MaterialCommunityIcons
            name="arrow-left"
            color={"#171810"}
            size={30}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Hi! Welcome back, you’ve been missed</Text>

      <View style={styles.body}>
        
        <TextInput
          style={styles.input}
          placeholder="Type here Email"
          secureTextEntry
        />

        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Send</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don’t have an account?
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default ForgetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    width: "100%",
    height: "100%", // Ensures the container takes up the full height of the screen
  },

  // Style for header containing the back arrow
  header: {
    position: "absolute", // Absolute positioning to fix it at the top
    top: 40, // Adjust this value based on the status bar height
    left: 20, // Space from the left
    zIndex: 1, // Ensures it stays above other elements
  },

  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#f53333", // White text for better contrast
  },

  subtitle: {
    textAlign: "center",
    fontSize: 20,
    color: "#f53333", // White text for the subtitle as well
    marginBottom: 20,
  },

  body: {
    alignItems: "center",
    marginTop: 100, // To prevent overlap with the header and adjust content placement
  },

  input: {
    width: "100%",
    height: 50,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#58a8f6", // Light blue background for input fields
    color: "#ffffff", // White text for input fields
  },

  forgotPassword: {
    marginRight: 20,
    color: "#8a4b39",
    marginBottom: 30,
  },

  signInButton: {
    backgroundColor: "#8a4b39",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    width: "40%",
    marginBottom: 20,
  },

  signInButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  orText: {
    marginVertical: 20,
    color: "#f53333", // White text for "Or sign in with"
  },

  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },

  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#f1f1f1",
  },

  footerText: {
    textAlign: "center",
    color: "#ffffff", // White text for footer
    marginVertical: 20,
  },

  signUpText: {
    color: "#8a4b39",
    fontWeight: "bold",
  },
});
