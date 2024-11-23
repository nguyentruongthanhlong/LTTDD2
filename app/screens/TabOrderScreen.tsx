import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function ScreenOrdered({ navigation }) {
  const animation = useRef(null);

  useEffect(() => {
    // Redirect to Home after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate("Home");
    }, 3000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop={false}
        ref={animation}
        source={require("../../assets/images/success.json")} // tải ở https://lottiefiles.com/
        style={styles.animation}
      />
      <Text style={styles.successMessage}>Mua hàng thành công!</Text>
      <Text style={styles.subMessage}>
        Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    position: 'relative',
  },
  animation: {
    width: '80%',  // Width of animation
    height: '40%', // Height of animation
  },
  successMessage: {
    marginTop: 20,
    color: "#3386FF",
    fontWeight: "bold",
    fontSize: 24,  // Increased font size for prominence
    textAlign: "center",  // Centered text
  },
  subMessage: {
    marginTop: 10,
    color: "#666",
    fontSize: 16, // Subtle but readable font size
    textAlign: "center",  // Centered text
    paddingHorizontal: 20, // Add padding for better spacing
  },
});

export default ScreenOrdered;
