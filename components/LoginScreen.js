import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import image from "../images/login_background.png";

const { width: WIDTH } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.contentContainer}>
          <Image source={image} style={styles.imageContainer}></Image>
          <View style={styles.inputContainer}>
            <Icon
              style={styles.inputIcon}
              name={"ios-person"}
              size={26}
              color={"rgba(0,0,0,0.35)"}
            />
            <TextInput
              style={styles.input}
              placeholder={"Username"}
              placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.inputContainer}>
            <Button
              style={styles.loginBtn}
              title="LOGIN"
              underlineColorAndroid="transparent"
              onPress={() => navigation.navigate("LandingScreen")}
            ></Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    height: null,
    width: null,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: WIDTH - 75,
    height: 300,
    marginBottom: 40,
  },
  inputContainer: {
    marginTop: 0.5,
  },
  input: {
    width: WIDTH - 45,
    height: 55,
    borderRadius: 25,
    fontSize: 20,
    paddingLeft: 45,
    backgroundColor: "rgba(0,0,0,0.25)",
    color: "rgba(255,255,255,0.7)",
  },
  inputIcon: {
    position: "absolute",
    top: 12,
    left: 10,
  },
  eyeIcon: {
    position: "absolute",
    top: 12,
    right: 10,
  },
  loginBtn: {
    width: WIDTH - 45,
    height: 55,
    borderRadius: 25,
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.25)",
    color: "rgba(255,255,255,0.7)",
  },
});

export default LoginScreen;
