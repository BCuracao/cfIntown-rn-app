import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen() {
  return (
    <WebView
      style={styles.webContent}
      source={{
        uri:
          "https://www.box-planner.com/External/ScheduleIFRAME?boxid=43d30492-669a-467d-bf2a-c8dd6c02bab8#/",
      }}
    />
  );
}

const Stack = createStackNavigator();

const WorkoutScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "CrossFit InTown",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  webContent: {
    flex: 1,
    justifyContent: "center",
  },
});

export default WorkoutScreen;
