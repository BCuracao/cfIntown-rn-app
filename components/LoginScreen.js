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
  Button,
  Alert,
  NativeModules,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import IconFA from "react-native-vector-icons/FontAwesome";
import image from "../images/login_background.png";
import WelcomeScreen from "./WelcomeScreen";
import { debug } from "react-native-reanimated";

const { width: WIDTH } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [nameStatus, setnameStatus] = useState(false);

  const nameInputHandler = (inputText) => {
    setUserName(inputText);
  };

  const getUserName = () => {
    return userName;
  };

  const confirmInputHandler = () => {
    const chosenName = userName;
    if (
      chosenName.trim() == "" ||
      chosenName.trim().length == 0 ||
      chosenName === "" ||
      chosenName == /^[A-Za-z]+$/
    ) {
      Alert.alert("Invalid Name", "Name can only consist of letters", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    } else {
      setnameStatus("true");
      console.log("button pressed and username is:");
      console.log(getUserName());
    }
  };

  const resetInputHandler = () => {
    setUserName("");
    setnameStatus("false");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.overallContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={image} style={styles.logo}></Image>
          </View>
          <View style={styles.footer}>
            {nameStatus ? (
              <View>
                <Icon
                  style={styles.inputIcon}
                  name={"ios-person"}
                  size={26}
                  color={"rgba(0,0,0,0.35)"}
                />
                <TextInput
                  style={styles.input}
                  placeholder={"Enter your name"}
                  placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                  underlineColorAndroid="transparent"
                  onChangeText={nameInputHandler}
                />
              </View>
            ) : null}
            <View style={styles.submit}>
              <IconFA
                style={styles.inputIcon}
                name={"arrow-circle-right"}
                size={26}
                color={"rgba(0,0,0,0.35)"}
              />
              <Button
                title="LOGIN"
                color="#fff"
                underlineColorAndroid="transparent"
                onPress={() => {
                  confirmInputHandler();
                  nameStatus
                    ? navigation.navigate("WelcomeScreen", { userName })
                    : null;
                }}
              ></Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
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
  submit: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH - 45,
    height: 55,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderColor: "#fff",
  },
  overallContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255,204,0,0.65)",
  },
  header: {
    flex: 2,
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
    marginTop: 25,
    width: height_logo,
    height: height_logo,
  },
});

export default LoginScreen;
