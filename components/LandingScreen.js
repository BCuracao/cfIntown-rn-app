import React, { useState } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  AsyncStorage,
} from "react-native";
import { Overlay } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { LineChart } from "react-native-chart-kit";

import WorkoutScreen from "./WorkoutScreen";
import image from "../images/login_background.png";
import kb from "../images/kettlebell.png";

var date = new Date().getDate();
var month = new Date().getMonth();

const Tab = createBottomTabNavigator();
const workoutData = [
  { key: "A" },
  { key: "B" },
  { key: "C" },
  { key: "D" },
  { key: "E" },
  { key: "F" },
  { key: "G" },
  { key: "H" },
  { key: "I" },
];

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
const screenWidth = Dimensions.get("window").width;
const dataChart = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const saveToChart = (input) => {
  dataChart.datasets.push(input);
  console.log("input pushed to chart: " + input);
  console.log(dataChart.datasets);
};

const numColumns = 3;
const LandingScreen = ({ navigation }) => {
  const [isVisible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!isVisible);
  };

  const saveDataItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataItem = async (key) => {};

  const ProgressInputScreen = () => {
    const [inputText, setInputText] = useState("");
    return (
      <View style={styles.overlayContainer}>
        <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay}>
          <Text style={styles.overlayText}>BENCHPRESS</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter weight in kg"
            onChangeText={(inputText) => setInputText(inputText)}
            defaultValue={inputText}
          ></TextInput>
          <Button
            title="Confirm"
            onPress={() => saveToChart(inputText)}
          ></Button>
          <LineChart
            data={dataChart}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />
        </Overlay>
      </View>
    );
  };
  const renderItem = () => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={toggleOverlay}>
        <Image source={kb} style={styles.item}></Image>
        <Text style={styles.itemText}>Workout</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {isVisible ? (
        <ProgressInputScreen />
      ) : (
        <View>
          <View style={styles.header}>
            <Image source={image} style={styles.logo}></Image>
          </View>
          <View style={styles.middle}>
            <FlatList
              style={styles.flatListContainer}
              data={workoutData}
              renderItem={renderItem}
              numColumns={numColumns}
            />
          </View>
          <View style={styles.footer}>
            <Text>FOOTER</Text>
          </View>
        </View>
      )}
    </ScrollView>
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
const { WIDTH } = Dimensions.get("screen").width;
const height_logo = height * 0.125;
const height_logo_shop = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  overlayContainer: {
    alignSelf: "baseline",
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,204,0,0.45)",
  },
  middle: {
    flex: 1.75,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
  flatListContainer: {
    flex: 1,
  },
  itemContainer: {
    alignItems: "center",
    width: WIDTH,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 100,
    height: 100,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  itemText: {},
  overlayText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
  },
  textInput: {
    height: 80,
  },
});

export default LandingScreen;
