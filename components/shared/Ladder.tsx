import React from "react";
import { View, StyleSheet } from "react-native";

const Ladder = ({ backgroundColor }: { backgroundColor: string }) => (
  <View style={styles.container}>
    <View style={[styles.verticalPeg, { left: 0 }]} />
    <View style={styles.peg} />
    <View style={[styles.verticalPeg, { right: 0 }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",

    width: "100%",
    height: "100%",
  },
  peg: {
    width: "100%",
    height: "50%",
    backgroundColor: "#1386A1",
  },

  verticalPeg: {
    width: 6,
    height: "100%",
    backgroundColor: "#1386A1",

    position: "absolute",
  },
});

export default Ladder;
