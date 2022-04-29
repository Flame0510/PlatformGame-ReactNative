import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { navigate } from "./shared/RootNavigation";

const Menu = () => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>PLATFORM GAME - REACT NATIVE</Text>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => navigate("Game", {})}
        >
          <Text style={styles.menuBtnText}>PLAY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "#F4CDD4",
  },
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#1386A1",

    fontSize: 48,
  },
  menuBtn: {
    backgroundColor: "#1386A1",

    paddingVertical: 24,
    paddingHorizontal: 48,
  },
  menuBtnText: {
    color: "#fff",

    fontSize: 32,
  },
});

export default Menu;
