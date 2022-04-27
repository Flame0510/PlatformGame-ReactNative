import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Animated } from "react-native";
import { gameRowsColumns } from "../environment/gameContainer";
import Controls from "./shared/Controls";
import { useBridge } from "./shared/useBridge";
import { useClimb } from "./shared/useClimb";
import { useCoin } from "./shared/useCoin";
import { useFinish } from "./shared/useFinish";
import { useGravity } from "./shared/useGravity";
import { useLevel } from "./shared/useLevel";

const Game = () => {
  const [direction, setDirection] = useState<"right" | "left">("right");

  const [climbLeg, setClimbLeg] = useState<"right" | "left">("right");
  const [canClimb, setCanClimb] = useState(false);

  const [canDescend, setCanDescend] = useState<boolean>(false);

  const [isClimbing, setIsClimbing] = useState(false);

  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isFalling, setIsFalling] = useState<boolean>(true);

  const [coinCounter, setCoinCounter] = useState<number>(0);
  const [coinPosition, setCoinPosition] = useState<number>(0);

  const [levelCounter, setLevelCounter] = useState<number>(1);

  const { rows, columns } = gameRowsColumns;

  //const [gameWindowSize, setGameWindowSize] = useState<GameWindowSize>();

  let gameWindowSize = {
    width: 400,
    height: 400,
  };

  const characterSize = { width: 20, height: 60 };

  const [characterPosition, setCharacterPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 120,
    y: 0,
  });

  //LEVEL
  const b = "b";
  const c = "c";
  const s = "s";
  const e = "e";
  const f = "f";

  const [level, setLevel] = useState<(number | string)[][]>(
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, c, c, c, c, c, c, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, f, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, f, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, f, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, b, b, b, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, s, 0, 1, 1, 0, c, c, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, e, 0, s, 0, 0, 0, 0, 0, 0, 0, 0],
    ].reverse()
  );

  //USE LEVEL
  const createLevel = useLevel({
    level,
    setLevel,
    characterPosition,
  });

  //USE CLIMB
  useClimb({
    level,
    characterPosition,

    setCanClimb,

    isClimbing,
    setIsClimbing,

    setCanDescend,

    isMoving,
    isJumping,
    isFalling,
  });

  //USE BRIDGE
  useBridge({
    level,
    setLevel,
    levelCounter,
    characterPosition,
    isMoving,
    isFalling,
    setIsFalling,
  });

  //USE COIN
  useCoin({
    level,
    setLevel,
    characterPosition,
    setCoinCounter,
    isMoving,
    isFalling,
  });

  //USE FINISH
  useFinish({
    level,
    setLevelCounter,
    createLevel,
    characterPosition,
    isMoving,
    isJumping,
    isFalling,
  });

  //useAnimation({ level, coinPosition, setCoinPosition });

  //USE GRAVITY
  gameWindowSize &&
    useGravity(
      1,
      gameWindowSize,
      level,
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
            width: columns * 20,
            //height: gameWindowSize?.height
          },
          characterPosition.x / 20 < columns / 2 && {
            left: 0,
          },
          characterPosition.x / 20 > columns / 2 && { right: 0 },
        ]}
        onLayout={({
          nativeEvent: {
            layout: { width, height },
          },
        }) => (console.log(height), (gameWindowSize = { width, height }))}
      >
        {/* COIN COUNTER */}
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",

            position: "absolute",
            bottom: -36,
            left: 0,

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

        {/* CHARACTER */}
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
        >
          <View
            style={{
              width: characterSize.width,
              height: characterSize.height / 3,

              backgroundColor: "#FFDBAC",
            }}
          >
            <View
              style={{
                width: "100%",
                height: 5,

                backgroundColor: "#000",
              }}
            />

            {!isClimbing && (
              <Text style={{ fontSize: 12, textAlign: direction }}>
                {isJumping || isFalling
                  ? "'o'"
                  : direction === "right"
                  ? "' .'"
                  : "'. '"}
              </Text>
            )}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: characterSize.width,
              height: characterSize.height / 3,

              backgroundColor: "green",

              zIndex: 10,
            }}
          >
            {!isClimbing && (
              <View
                style={{
                  width: 5,
                  height: 12,

                  right: direction === "right" ? 2 : -2,

                  backgroundColor: "#FFDBAC",
                }}
              />
            )}
          </View>
          {/* LEGS */}
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: characterSize.width / 2,
                height:
                  characterSize.height /
                  (climbLeg === "left" && isClimbing ? 2 : isJumping ? 5 : 3),

                backgroundColor: "blue",
              }}
            >
              <View
                style={{
                  width: characterSize.width / 2,
                  height: 6,

                  backgroundColor: "#000",

                  position: "absolute",
                  bottom: 0,
                }}
              />
            </View>

            <View
              style={{
                width: characterSize.width / 2,
                height:
                  characterSize.height /
                  (climbLeg === "right" && isClimbing ? 2 : isJumping ? 5 : 3),

                backgroundColor: "blue",
              }}
            >
              <View
                style={{
                  width: characterSize.width / 2,
                  height: 6,

                  backgroundColor: "#000",

                  position: "absolute",
                  bottom: 0,
                }}
              />
            </View>
          </View>
        </View>

        {/* LEVEL */}
        {level.map((row, rowKey) =>
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
                text = "-_-";
                break;

              case "f":
                backgroundColor = "#555";
            }

            return (
              element !== 0 && (
                <Animated.View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 20,
                    height: element !== "b" ? 20 : 10,
                    backgroundColor,

                    borderRadius: element === "c" ? 12 : 0,

                    position: "absolute",
                    bottom:
                      rowKey * 20 +
                      (element === "b"
                        ? 10
                        : element === "c"
                        ? coinPosition
                        : 0),
                    left: key * 20,
                  }}
                  key={key}
                >
                  <Text style={{ textAlign: "center", fontSize: 10 }}>
                    {/* {rowKey},{key} */}
                    {text}
                  </Text>
                </Animated.View>
              )
            );
          })
        )}

        <View
          style={{
            alignItems: "center",
            width: "100%",
            position: "absolute",
            bottom: -100,
          }}
        >
          <Text>LEVEL: {levelCounter}</Text>
          <Text>canDescend: {canDescend ? "SI" : "NO"}</Text>
          <Text>canClimb: {canClimb ? "SI" : "NO"}</Text>
          <Text>isFalling: {isFalling ? "SI" : "NO"}</Text>
          <Text>
            X: {characterPosition.x} - Y: {characterPosition.y}
          </Text>
        </View>
      </View>

      <Controls
        level={level}
        characterSize={characterSize}
        characterPosition={characterPosition}
        setCharacterPosition={setCharacterPosition}
        setDirection={setDirection}
        canClimb={canClimb}
        canDescend={canDescend}
        isClimbing={isClimbing}
        setClimbLeg={setClimbLeg}
        setIsClimbing={setIsClimbing}
        isMoving={isMoving}
        setIsMoving={setIsMoving}
        isJumping={isJumping}
        setIsJumping={setIsJumping}
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
    alignItems: "center",

    width: "100%",
    height: "100%",

    backgroundColor: "darkorange",
  },

  gameContainer: {
    justifyContent: "center",
    height: "60%",
    backgroundColor: "#eee",

    position: "absolute",
    top: 0,
  },

  character: {
    position: "absolute",

    zIndex: 1,
  },
});

export default Game;
