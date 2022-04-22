import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaViewBase,
  SafeAreaView,
  Animated,
} from "react-native";
import { GameWindowSize } from "../models/GameWindow";
import Controls from "./shared/Controls";
import { useGravity } from "./shared/useGravity";

const Game = () => {
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isFalling, setIsFalling] = useState<boolean>(true);

  //const [gameWindowSize, setGameWindowSize] = useState<GameWindowSize>();

  let gameWindowSize = {
    width: 300,
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
    x: 200,
    y: 200,
  });

  //const jump = useJump(characterPosition, setCharacterPosition, isJumping, setIsJumping, isFalling, setIsFalling);

  const jump = () => {
    console.log("JUMP: ", isJumping);
    console.log("FALL: ", isFalling);

    if (!isJumping && !isFalling) {
      setIsJumping(true);
      const targetY = characterPosition.y + 100;

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

  gameWindowSize &&
    useGravity(
      1,
      gameWindowSize,
      characterPosition,
      setCharacterPosition,
      isJumping,
      isFalling,
      setIsFalling
    );

  const mapArray = [
    [1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 1],
    [0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1],
  ];

  return gameWindowSize ? (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View
        style={
          (styles.gameContainer,
          {
            width: gameWindowSize?.width,
            height: gameWindowSize?.height,
          })
        }
        /* onLayout={({
          nativeEvent: {
            layout: { width, height },
          },
        }) => (console.log(width), gameWindowSize = ({ width, height }))} */
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

        {mapArray.reverse().map((row, rowKey) =>
          row.map(
            (element, key) =>
              element === 1 && (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "red",

                    position: "absolute",
                    bottom: rowKey * 20,
                    left: key * 20,

                    zIndex: 100,
                  }}
                />
              )
          )
        )}

        <View style={{ position: "absolute" }}>
          <Text>isFalling: {isFalling}</Text>
          <Text>{characterPosition.y}</Text>
          <Text>{gameWindowSize && gameWindowSize.height}</Text>
        </View>
      </View>

      <Controls
        characterPosition={characterPosition}
        setCharacterPosition={setCharacterPosition}
        jump={jump}
        isFalling={isFalling}
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
    width: 300,
    height: 400,

    backgroundColor: "lightblue",
  },

  character: {
    backgroundColor: "green",

    position: "absolute",
  },
});

export default Game;
