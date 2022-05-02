import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useMusic } from "../hooks/useMusic";
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
  const { isMuted, playSound, resumeSound, stopSound, switchMute } = useMusic();

  return visibility ? (
    <View style={styles.container}>
      <Text style={styles.title}>paus​a</Text>

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

      <TouchableOpacity style={styles.muteUnmuteBtn} onPress={switchMute}>
        <FontAwesomeIcon
          icon={isMuted ? faVolumeHigh : faVolumeXmark}
          size={24}
          color={"#fff"}
        />
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

    fontFamily: "steelworks",

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

    fontFamily: "workSans",
    textAlign: "center",

    fontSize: isMobile ? 24 : 32,
  },

  muteUnmuteBtn: {
    alignItems: "center",
    backgroundColor: "#1386A1",
    padding: 12,
  },
});

export default Pause;
