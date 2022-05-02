import React, { useMemo } from "react";
import { View, Text, Image } from "react-native";
import { gameRowsColumns } from "../../environment/gameContainer";
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
  const { rows, columns } = gameRowsColumns;

  return useMemo(() => {
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

          /* borderTopRightRadius:
            element === 1 &&
            columnKey < columns &&
            level[rowKey + 1][columnKey] === 0 &&
            level[rowKey + 1][columnKey + 1] === 0 &&
            level[rowKey][columnKey + 1] === 0
              ? 6
              : element === "c"
              ? 12
              : 0,

          borderBottomRightRadius:
            element === 1 &&
            rowKey > 0 &&
            level[rowKey - 1][columnKey] === 0 &&
            level[rowKey - 1][columnKey + 1] === 0 &&
            level[rowKey][columnKey + 1] === 0
              ? 6
              : element === "c"
              ? 12
              : 0,

          borderTopLeftRadius:
            element === 1 &&
            columnKey < columns &&
            level[rowKey + 1][columnKey] === 0 &&
            level[rowKey + 1][columnKey - 1] === 0 &&
            level[rowKey][columnKey - 1] === 0
              ? 6
              : element === "c"
              ? 12
              : 0,

          borderBottomLeftRadius:
            element === 1 &&
            rowKey > 0 &&
            columnKey > 0 &&
            level[rowKey - 1][columnKey - 1] === 0 &&
            level[rowKey - 1][columnKey - 1] === 0 &&
            level[rowKey][columnKey - 1] === 0
              ? 6
              : element === "c"
              ? 12
              : 0, */
        }}
        key={columnKey}
      >
        {element === "l" ? (
          <Ladder />
        ) : element === "c" ? (
          <Image
            source={require("../../assets/fish.png")}
            style={{ width: 20, height: 20 }}
          />
        ) : (
          <Text style={{ color, textAlign: "center", fontSize: 10 }}>
            {/* {rowKey},{columnKey} */}
            {text}
          </Text>
        )}
      </View>
    );
  }, [level[rowKey][columnKey]]);
};

export default Tile;
