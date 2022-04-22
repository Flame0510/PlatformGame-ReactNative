import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaViewBase,
  SafeAreaView,
  Animated,
} from "react-native";
import Controls from "./shared/Controls";

interface GameWindow {
  width: number;
  height: number;
}

const Game = () => {
  const [gameWindowSize, setGameWindowSize] = useState<GameWindow>();
  const [gravityState, setGravityState] = useState<boolean>(false);

  const characterSize = { width: 20, height: 60 };

  const [characterPosition, setCharacterPosition] = useState<{
    animatedValues: { x: Animated.Value; y: Animated.Value };
    values: { x: number; y: number };
  }>({
    animatedValues: { x: new Animated.Value(0), y: new Animated.Value(0) },
    values: { x: 0, y: 0 },
  });

  const [isJumping, setIsJumping] = useState<boolean>(false);

  const jump = () => {
    console.log(isJumping);

    if (!isJumping) {
      setIsJumping(true);

      characterPosition.values.y -= 50;

      Animated.timing(characterPosition.animatedValues.y, {
        toValue: characterPosition.values.y - 50,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  const gravity = (tick: number) => {
    setInterval(() => {
      console.log("TICK");

      console.log(isJumping);

      if (
        !isJumping &&
        characterPosition.values.y !==
          gameWindowSize!.height - characterSize.height - 2
      ) {
        let {
          values: { x, y },
        } = characterPosition;

        const cpy =
          y < gameWindowSize!.height
            ? gameWindowSize!.height - characterSize.height - 2
            : y;

        Animated.timing(characterPosition.animatedValues.y, {
          toValue: y,
          duration: 100,
          useNativeDriver: true,
        }).start(() => {
          setIsJumping(false);
          characterPosition.values.y = cpy;
        });
      }
    }, tick);
  };

  useEffect(() => {
    gameWindowSize && gravity(1000);
  }, [gameWindowSize]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View
        style={styles.gameContainer}
        onLayout={({
          nativeEvent: {
            layout: { width, height },
          },
        }) => setGameWindowSize({ width, height })}
      >
        <Animated.View
          style={[
            styles.character,
            {
              width: characterSize.width,
              height: characterSize.height,
              transform: [
                { translateX: characterPosition.animatedValues.x },
                { translateY: characterPosition.animatedValues.y },
              ],
            },
          ]}
        />
      </View>

      <Controls
        characterPosition={characterPosition}
        setCharacterPosition={setCharacterPosition}
        jump={jump}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },

  gameContainer: {
    flex: 2,

    width: "100%",
    height: "100%",

    borderWidth: 2,
    borderColor: "lightblue",
  },

  character: {
    backgroundColor: "green",
  },
});

//export default Game;
