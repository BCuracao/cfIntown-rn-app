import React from "react";
import { View, Image, Button, StyleSheet, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import WorkoutScreen from "./WorkoutScreen";
import image from "../images/login_background.png";

const Tab = createBottomTabNavigator();

const { width: WIDTH } = Dimensions.get("window");

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={image} style={styles.logo}></Image>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,204,0,0.65)",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    marginTop: 25,
    width: height_logo,
    height: height_logo,
  },
});

export default LandingScreen;
