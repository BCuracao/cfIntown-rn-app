import React from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import WorkoutScreen from "./WorkoutScreen";
import image from "../images/login_background.png";
import shopImage from "../images/shop_menu.png";
import shopImageRound from "../images/shop_menu_round.png";

const Tab = createBottomTabNavigator();

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={image} style={styles.logo}></Image>
      </View>
      <View style={styles.middle}>
        <Image source={shopImageRound} style={styles.logoShop}></Image>
        <Text style={styles.shopText}>Track Progress</Text>
      </View>
      <View style={styles.footer}>
        <Button
          title="Load Overlay"
          onPress={() => navigation.navigate("InputOverlay")}
        ></Button>
      </View>
    </View>
  );
};

export const LandingScreenTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = "ios-home";
          } else if (route.name == "Workout") {
            iconName = "logo-rss";
          } else if (route.name == "Records") {
            iconName = "ios-settings";
          } else if (route.name == "Contact") {
            iconName = "ios-contact";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={LandingScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Records" component={LandingScreen} />
      <Tab.Screen name="Contact" component={LandingScreen} />
    </Tab.Navigator>
  );
};

const { height } = Dimensions.get("screen");
const height_logo = height * 0.125;
const height_logo_shop = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,204,0,0.45)",
  },
  header: {
    flex: 0.75,
    justifyContent: "center",
    alignItems: "center",
  },
  middle: {
    flex: 1,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  footer: {
    flex: 1,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  logo: {
    marginTop: 25,
    width: height_logo,
    height: height_logo,
  },
  logoShop: {
    width: height_logo_shop + 40,
    height: height_logo_shop - 30,
  },
  shopText: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    fontSize: 30,
  },
});

export default LandingScreen;
