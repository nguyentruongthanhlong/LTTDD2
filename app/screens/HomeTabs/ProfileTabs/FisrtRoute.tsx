import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const FirstRoute = ({ navigation }: { navigation: any }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Image
            source={require("../../../../assets/images/Ellipselogo3.png")}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Shaheen Uddin Ahmad</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
          <MaterialCommunityIcons name="cog" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>10</Text>
          <Text style={styles.statLabel}>Preferred list</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>10</Text>
          <Text style={styles.statLabel}>Followed stores</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>10</Text>
          <Text style={styles.statLabel}>Voucher List</Text>
        </View>
      </View>

      {/* Order Section */}
      <View style={styles.orderSection}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderTitle}>Your Order List</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orderActions}>
          <View style={styles.actionBox}>
            <MaterialCommunityIcons
              name="file-document"
              size={30}
              color="#550b24"
            />
            <Text style={styles.actionLabel}>To pay</Text>
          </View>
          <View style={styles.actionBox}>
            <MaterialCommunityIcons name="send" size={30} color="#550b24" />
            <Text style={styles.actionLabel}>To send</Text>
          </View>
          <View style={styles.actionBox}>
            <MaterialCommunityIcons name="truck" size={30} color="#550b24" />
            <Text style={styles.actionLabel}>To receive</Text>
          </View>
          <View style={styles.actionBox}>
            <MaterialCommunityIcons
              name="comment-text"
              size={30}
              color="#550b24"
            />
            <Text style={styles.actionLabel}>Review</Text>
          </View>
        </View>
      </View>

      {/* Delivery Section */}
      <View style={styles.deliverySection}>
        <Text style={styles.sectionTitle}>Track Packages</Text>
        <View style={styles.packageInfo}>
          <Image
            source={require("../../../../assets/images/Ellipselogo3.png")}
            style={styles.packageImage}
          />
          <View>
            <Text style={styles.packageStatus}>Delivery Complete</Text>
            <Text style={styles.packageName}>Jas Oversized</Text>
            <Text style={styles.packageDate}>13: 15 Apr 31</Text>
          </View>
        </View>
      </View>

      {/* Full-Screen Advertisement Section */}
      <View style={styles.adSection}>
        <Image
          source={require("../../../../assets/images/supersale.png")}
          style={styles.adImage}
        />
      </View>
    </ScrollView>
  );
};

export default FirstRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileContainer: {
    backgroundColor: "#0066cc",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#fff",
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#666",
  },
  orderSection: {
    marginTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#0066cc",
    fontWeight: "bold",
  },
  orderActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionBox: {
    alignItems: "center",
  },
  actionLabel: {
    marginTop: 10,
    fontSize: 14,
  },
  deliverySection: {
    marginTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  packageInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  packageImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  packageStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  packageName: {
    color: "#666",
  },
  packageDate: {
    color: "#999",
  },
  adSection: {
    marginTop: 20,
    alignItems: "center",
    width: width, // Full screen width
    height: height * 0.5, // Adjust height as needed (50% of screen height)
    backgroundColor: "#fff",
  },
  adImage: {
    width: "100%",
    height: "90%",
    resizeMode: "cover", // Cover the full view
  },
});
