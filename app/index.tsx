import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgetScreen from "./screens/ForgetScreen";
import SplashScreen from "./screens/SplashScreen";
import Setting from "./screens/Setting";
import CartScreen from "./screens/HomeTabs/CartScreen";
import ScreenOrdered from "./screens/TabOrderScreen";

const Stack = createNativeStackNavigator();

const myapp = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Details"
          component={DetailScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={SignInScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Forget"
          component={ForgetScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Setting"
          component={Setting}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="cart"
          component={CartScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="taborder"
          component={ScreenOrdered}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default myapp;

const styles = StyleSheet.create({});
