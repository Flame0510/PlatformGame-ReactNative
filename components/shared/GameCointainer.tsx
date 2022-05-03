import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { gameRowsColumns } from "../../environment/gameContainer";
import Character from "./Character";
import Tile from "./Tile";

const GameContainer = ({
  level,
  characterSize,
  characterPosition,
  direction,
  isMoving,
  isClimbing,
  climbLeg,
  isKicking,
  isJumping,
  isFalling,
}: any) => {
  const { rows, columns } = gameRowsColumns;

  const windowX = useRef(new Animated.Value(0)).current;
  const windowY = useRef(new Animated.Value(0)).current;

  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;

  const scaleX = width >= 768 ? width / (width / 2) : 1;
  const scaleY = width >= 768 ? height / (height / 2) : 1;

  // console.log("WIDTH ", width);
  // console.log("HEIGHT ", height);
  // console.log("SCALEY: ", scaleY);

  // console.log("gameHeigth: ", rows * 20 * scaleX);

  useEffect(() => {
    const y = -((rows * 20) / 2 - characterPosition.y);
    const x = (columns * 20) / 2 - characterPosition.x;

    Animated.timing(windowY, {
      toValue: y,
      //duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.spring(windowX, {
      toValue: x,
      //duration: 500,
      useNativeDriver: true,
    }).start();
  }, [characterPosition]);

  return (
    <Animated.View
      style={[
        styles.gameContainer,
        {
          width: columns * 20,
          height: rows * 20,

          transform: [
            {
              scale: scaleX,
            },
            {
              translateY: windowY,
            },
            {
              translateX: windowX,
            },
          ],
        },
        /* characterPosition.y / 20 < rows / 2 && {
          bottom: Dimensions.get("window").height / 2,
        },
        characterPosition.y / 20 > rows / 2 && { top: 0 },
        characterPosition.x / 20 < columns / 2 && {
          left: 0,
        },
        characterPosition.x / 20 > columns / 2 && { right: 0 }, */
      ]}
    >
      <View
        style={{
          width: 10,
          height: "100%",
          backgroundColor: "red",
          position: "absolute",
          left: (columns * 20) / 2,
        }}
      />

      <View
        style={{
          width: "100%",
          height: 10,
          backgroundColor: "red",
          position: "absolute",
          top: (rows * 20) / 2,
        }}
      />

      

      {/* CHARACTER */}
      <Character
        characterSize={characterSize}
        characterPosition={characterPosition}
        direction={direction}
        isMoving={isMoving}
        isClimbing={isClimbing}
        climbLeg={climbLeg}
        isKicking={isKicking}
        isJumping={isJumping}
        isFalling={isFalling}
      />

      {/* LEVEL */}
      {level.map((row: [], rowKey: number) =>
        row.map((element, columnKey) => {
          let color = "#000";
          let backgroundColor = "";
          let text = "";

          switch (element) {
            case 1:
              backgroundColor = "#F4CDD4";
              text = "_I";
              break;

            case "b":
              backgroundColor = "#C4A484";
              break;

            case "c":
              backgroundColor = "transparent";
              text = "c";
              break;

            case "s":
              color = "#fff";
              backgroundColor = "#1386A1";
              text = "__";
              break;

            case "e":
              backgroundColor = "red";
              text = "-_-";
              break;

            case "f":
              backgroundColor = "#1386A1";
          }

          return (
            element !== 0 && (
              <Tile
                level={level}
                element={element}
                color={color}
                backgroundColor={backgroundColor}
                rowKey={rowKey}
                columnKey={columnKey}
                text={text}
              />
            )
          );
        })
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    justifyContent: "center",

    //height: "40%",

    backgroundColor: "#eee",
  },
});

export default GameContainer;
