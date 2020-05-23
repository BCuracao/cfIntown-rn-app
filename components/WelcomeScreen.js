import React, { useState, Component, useEffect } from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";

const WelcomeScreen = ({ route, navigation }) => {
  const { userName } = route.params;

  useEffect(() => {
    window.setTimeout(() => {
      navigation.navigate("LandingScreen");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../images/login_background.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.greeting}>
          Hi, {JSON.stringify(userName).slice(1, -1)}
        </Text>
      </View>
    </View>
  );
};

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,204,0,0.65)",
  },
  header: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  greeting: {
    fontSize: 40,
    color: "#666666",
    fontFamily: "System",
  },
});

export default WelcomeScreen;
