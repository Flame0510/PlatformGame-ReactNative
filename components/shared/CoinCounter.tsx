import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CoinCounter = ({ coinCounter }: { coinCounter: number }) => (
  <View style={styles.container}>
    <Image source={require("../../assets/fish.png")} style={styles.coinIcon} />

    <Text style={styles.counterText}>: {coinCounter}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",

    position: "absolute",
    top: 0,
    right: 0,

    padding: 8,

    zIndex: 1,
  },
  coinIcon: {
    width: 40,
    height: 40,
  },
  counterText: {
    fontFamily: "workSans",
    fontSize: 24,
  },
});

export default CoinCounter;
