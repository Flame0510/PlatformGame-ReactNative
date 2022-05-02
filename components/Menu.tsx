import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { navigate } from "./shared/RootNavigation";

const width = Dimensions.get("screen").width;

const isMobile = width < 768;

const Menu = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>game</Text>
      </View>

      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => navigate("Game", {})}
      >
        <Text style={styles.menuBtnText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "#F4CDD4",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#F4CDD4",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
  },
  logo: {
    height: "40%",

    resizeMode: "contain",
  },
  title: {
    width: "80%",
    marginVertical: 24,
    color: "#1386A1",

    fontFamily: "steelworks",

    textAlign: "center",
    fontSize: isMobile ? 32 : 72,
  },
  muteUnmuteBtn: {
    backgroundColor: "#1386A1",
    padding: 12,

    position: "absolute",
    top: 0,
    left: 0,

    zIndex: 1,
  },
  menuBtn: {
    backgroundColor: "#1386A1",

    paddingVertical: 24,
    paddingHorizontal: 48,
  },
  menuBtnText: {
    color: "#fff",

    fontFamily: "workSans",

    fontSize: isMobile ? 24 : 48,
  },
});

export default Menu;
