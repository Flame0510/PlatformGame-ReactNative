import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { navigate } from "./shared/RootNavigation";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const isMobile = width < 768;

const Pause = ({
  visibility,
  setVisibility,
}: {
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
}) => {
  return visibility ? (
    <View style={styles.container}>
      <Text style={styles.title}>Pausa</Text>

      <TouchableOpacity
        style={styles.pausedBtn}
        onPress={() => setVisibility(false)}
      >
        <Text style={styles.pausedBtnText}>Riprendi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.pausedBtn}
        onPress={() => navigate("Menu", {})}
      >
        <Text style={styles.pausedBtnText}>Vai al Menu</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

    width,
    height,

    backgroundColor: "#F4CDD4",

    position: "absolute",
    top: 0,
    left: 0,

    zIndex: 50,
  },

  title: {
    color: "#1386A1",

    fontSize: isMobile ? 32 : 48,
  },

  pausedBtn: {
    width: isMobile ? 200 : 300,
    marginVertical: 24,

    backgroundColor: "#1386A1",

    paddingVertical: 24,
  },
  pausedBtnText: {
    color: "#fff",

    textAlign: "center",

    fontSize: isMobile ? 24 : 32,
  },
});

export default Pause;
