import React from "react";
import { View, Text } from "react-native";

const CoinCounter = ({ coinCounter }: { coinCounter: number }) => (
  <View
    style={{
      alignItems: "center",
      flexDirection: "row",

      position: "absolute",
      top: 0,
      right: 0,

      padding: 8,

      zIndex: 1,
    }}
  >
    <Text>Coins: </Text>
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",

        width: 20,
        height: 20,
        backgroundColor: "gold",

        borderRadius: 12,

        zIndex: 1,
      }}
    >
      <Text style={{ fontSize: 10 }}>{coinCounter}</Text>
    </View>
  </View>
);

export default CoinCounter;
