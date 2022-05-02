import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Game from "./components/Game";
import { navigationRef } from "./components/shared/RootNavigation";
import Menu from "./components/Menu";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    steelworks: require("./assets/fonts/steelworks.otf"),
    workSans: require("./assets/fonts/workSans.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Menu"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F4CDD4",
  },
});

export default App;
