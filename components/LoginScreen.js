import React, { useState, useEffect } from "react";
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
  AsyncStorage,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import IconFA from "react-native-vector-icons/FontAwesome";
import image from "../images/login_background.png";

const { width: WIDTH } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [enteredName, setEnteredName] = useState("");
  const [nameAvailable, setNameAvailable] = useState(false);
  const [didUserLogin, setDidUserLogin] = useState(false);

  const textInputHandler = (input) => {
    setEnteredName(input);
  };

  const saveDataItem = async (key, value) => {
    console.log("saveDataItem: " + key + " the value: " + value);
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("Saving data error");
    }
  };

  const getDataItem = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setEnteredName(value);
        setNameAvailable(true);
        return value;
      } else {
        console.log("Read data error");
        setNameAvailable(false);
      }
    } catch (error) {
      console.log("Read data error");
    }
  };

  useEffect(() => {
    getDataItem("NAME");
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.overallContainer}
    >
      {didUserLogin ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image source={image} style={styles.logo}></Image>
            </View>
            <View style={styles.footer}>
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
                  onChangeText={textInputHandler}
                  value={enteredName}
                />
              </View>
              <View style={styles.submit}>
                <IconFA
                  style={styles.inputIcon}
                  name={"arrow-circle-right"}
                  size={26}
                  color={"rgba(0,0,0,0.35)"}
                />
                {nameAvailable ? (
                  <Button
                    title="LOGIN"
                    color="#fff"
                    underlineColorAndroid="transparent"
                    onPress={() => {
                      setDidUserLogin(true),
                        navigation.navigate("WelcomeScreen", { enteredName });
                    }}
                  ></Button>
                ) : (
                  <Button
                    title="CONFIRM"
                    color="#fff"
                    underlineColorAndroid="transparent"
                    onPress={() => {
                      saveDataItem("NAME", enteredName);
                    }}
                  ></Button>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        navigation.navigate("WelcomeScreen", { enteredName })
      )}
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
    backgroundColor: "rgba(255,204,0,0.45)",
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
