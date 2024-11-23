import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "./HomeTabs/Profile";
import Notification from "./HomeTabs/Notification";
import Feed from "./HomeTabs/feed"; // Corrected to use capitalized component names
import Wishlist from "./HomeTabs/withlist"; // Corrected to use capitalized component names
import CartScreen from "./HomeTabs/CartScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#834D1E", // Active tab color
        tabBarInactiveTintColor: "#230C02", // Inactive tab color
        tabBarShowLabel: false, // This hides the tab labels
        tabBarStyle: styles.tabBar, // Custom tab bar style
      }}
    >
      <Tab.Screen
        name="Home"
        component={Feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Define custom styles
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#EEDCC6", // Background color of the tab bar
    paddingVertical: 5, // Padding to increase the tap area
    height: 60, // Customize height if necessary
  },
});

export default HomeScreen;
