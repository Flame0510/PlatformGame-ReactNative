import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Animated } from "react-native";
import { GameWindowSize } from "../models/GameWindow";
import Controls from "./shared/Controls";
import { useGravity } from "./shared/useGravity";

const Game = () => {
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isFalling, setIsFalling] = useState<boolean>(true);

  //const [gameWindowSize, setGameWindowSize] = useState<GameWindowSize>();

  let gameWindowSize = {
    width: 400,
    height: 400,
  };

  const [gravityState, setGravityState] = useState<boolean>(false);

  const characterSize = { width: 20, height: 60 };

  /* const [characterPosition, setCharacterPosition] = useState<{
    animatedValues: { x: Animated.Value; y: Animated.Value };
    values: { x: number; y: number };
  }>({
    animatedValues: { x: new Animated.Value(0), y: new Animated.Value(0) },
    values: { x: 0, y: 0 },
  }); */

  const [characterPosition, setCharacterPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 120,
    y: 0,
  });

  //const jump = useJump(characterPosition, setCharacterPosition, isJumping, setIsJumping, isFalling, setIsFalling);

  const jump = () => {
    console.log("JUMP: ", isJumping);
    console.log("FALL: ", isFalling);

    if (!isJumping && !isFalling) {
      setIsJumping(true);
      const targetY = characterPosition.y + 60;

      const jumpInterval = setInterval(() => {
        if (characterPosition.y < targetY) {
          characterPosition.y += 10;
          setCharacterPosition({ ...characterPosition });
        } else {
          clearInterval(jumpInterval);
          setIsJumping(false);
          setIsFalling(true);
        }
      }, 1);

      /* setCharacterPosition(({ x, y }) => {
        return { x, y: y + 100 };
      }); */

      //setCharacterPosition(({ x, y }) => ({ x, y: y - 100 }));

      /* Animated.timing(characterPosition.animatedValues.y, {
        toValue: characterPosition.values.y - 50,
        duration: 100,
        useNativeDriver: true,
      }).start(); */
    }
  };

  // EMPTY ROW
  // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],

  const b = "b";
  const c = "c";
  const s = "s";
  const e = "e";
  const f = "f";

  let mapArray = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, c, c, c, c, c, c, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, f, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, b, b, b, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, s, 0, 1, 1, 0, c, c, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, e, 0, s, 0, 0, 0, 0, 0, 0, 0, 1],
  ].reverse();

  gameWindowSize &&
    useGravity(
      1,
      gameWindowSize,
      mapArray,
      characterPosition,
      setCharacterPosition,
      isJumping,
      isFalling,
      setIsFalling
    );

  return gameWindowSize ? (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View
        style={[
          styles.gameContainer,
          {
            width: gameWindowSize?.width,
            //height: gameWindowSize?.height
          },
        ]}
        onLayout={({
          nativeEvent: {
            layout: { width, height },
          },
        }) => (console.log(height), (gameWindowSize = { width, height }))}
      >
        <View
          style={[
            styles.character,
            {
              width: characterSize.width,
              height: characterSize.height,

              left: characterPosition.x,
              bottom: characterPosition.y,
            },
          ]}
        />

        {mapArray.map((row, rowKey) =>
          row.map((element, key) => {
            let backgroundColor = "";
            let text = "";

            switch (element) {
              case 1:
                backgroundColor = "darkorange";
                text = "_I";
                break;

              case "b":
                backgroundColor = "#C4A484";
                break;

              case "c":
                backgroundColor = "gold";
                text = "c";
                break;

              case "s":
                backgroundColor = "brown";
                text = "|=|";
                break;

              case "e":
                backgroundColor = "red";
                text = "o_o";
                break;

              case "f":
                backgroundColor = "#555";
            }

            return (
              element !== 0 && (
                <View
                  style={{
                    width: 20,
                    height: element !== "b" ? 20 : 10,
                    backgroundColor,

                    borderRadius: element === "c" ? 12 : 0,

                    position: "absolute",
                    bottom: rowKey * 20 + (element === "b" ? 10 : 0),
                    left: key * 20,
                  }}
                  key={key}
                >
                  <Text style={{ textAlign: "center" }}>{text}</Text>
                </View>
              )
            );
          })
        )}

        <View style={{ position: "absolute" }}>
          <Text>isFalling: {isFalling}</Text>
          <Text>X: {characterPosition.x}</Text>
          <Text>{characterPosition.y}</Text>
          <Text>{gameWindowSize && gameWindowSize.height}</Text>
        </View>
      </View>

      <Controls
        mapArray={mapArray}
        characterPosition={characterPosition}
        setCharacterPosition={setCharacterPosition}
        jump={jump}
        isFalling={isFalling}
        setIsFalling={setIsFalling}
      />
    </SafeAreaView>
  ) : (
    <Text>LOADING</Text>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    justifyContent: "space-between",
    height: "100%",

    backgroundColor: "gray",
  },

  gameContainer: {
    height: "50%",
    backgroundColor: "#eee",
  },

  character: {
    backgroundColor: "green",

    position: "absolute",

    zIndex: 1,
  },
});

export default Game;
