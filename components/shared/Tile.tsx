import React, { useMemo } from "react";
import { View, Text } from "react-native";
import Ladder from "./Ladder";

const Tile = ({
  level,
  element,
  color,
  backgroundColor,
  rowKey,
  columnKey,
  text,
}: any) => {
  const tile = useMemo(() => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 20,
          height: element !== "b" ? 20 : 10,
          backgroundColor,

          borderRadius: element === "c" ? 12 : 0,

          position: "absolute",
          bottom: rowKey * 20 + (element === "b" ? 10 : 0),
          left: columnKey * 20,
        }}
        key={columnKey}
      >
        {element === "l" ? (
          <Ladder/>
        ) : (
          <Text style={{ color, textAlign: "center", fontSize: 10 }}>
            {/* {rowKey},{key} */}
            {text}
          </Text>
        )}
      </View>
    );
  }, [level[rowKey][columnKey]]);

  return tile;
};

export default Tile;
