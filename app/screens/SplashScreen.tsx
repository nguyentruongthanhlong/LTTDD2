import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const backgroundImage = require("../../assets/images/image 21.png");

const SplashScreen = ({ navigation }: { navigation: any }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("SignIn")}>
      <ImageBackground
        source={backgroundImage}
        style={styles.container}
        resizeMode="cover"
      >
        {/* Header containing the back arrow */}
        <View style={styles.header}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="arrow-left"
              color={"#171810"}
              size={30}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/e-commerce-logo 1.png")}
            style={styles.logo}
          />

          {/* Custom-styled button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  header: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: "80%",
    height: undefined,
    aspectRatio: 1,
  },

  // Button styling
  button: {
    backgroundColor: "#FF6F61", // Soft orange color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25, // Rounded corners
    marginTop: 30,
    shadowColor: "#000", // Drop shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },

  buttonText: {
    color: "#FFFFFF", // White text
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
