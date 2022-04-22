import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Game from "./components/Game";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {
  return <Game />;
};

export default App;

/* <NavigationContainer>
    <StatusBar style="auto" />
    <Stack.Navigator
      initialRouteName="Home"
      defaultScreenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer> */
