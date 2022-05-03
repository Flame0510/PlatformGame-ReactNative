import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { gameRowsColumns } from "../environment/gameContainer";
import CoinCounter from "./shared/CoinCounter";
import Controls from "./shared/Controls";
import { useBridge } from "../hooks/useBridge";
import { useClimb } from "../hooks/useClimb";
import { useCoin } from "../hooks/useCoin";
import { useFinish } from "../hooks/useFinish";
import { useGravity } from "../hooks/useGravity";
import { useLevel } from "../hooks/useLevel";
import GameContainer from "./shared/GameCointainer";
import Pause from "./Pause";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Game = () => {
  const [isPaused, setIsPaused] = useState(false);

  const [direction, setDirection] = useState<"right" | "left">("right");

  const [isKicking, setIsKicking] = useState(false);

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

  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;

  let gameWindowSize = {
    width: 400,
    height: 400,
  };

  const characterSize = { width: 20, height: 60 };

  const [characterPosition, setCharacterPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 80,
    y: 0,
  });

  const fadeValue = useRef(new Animated.Value(0)).current;

  //LEVEL
  const b = "b";
  const c = "c";
  const l = "l";
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
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, 0, 1, 1, 0, c, c, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, l, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, 0, 0, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, l, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, e, 0, l, 0, 0, 0, 0, 0, 0, 0, 0],
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

  //USE GRAVITY
  gameWindowSize &&
    useGravity({
      tick: 50,
      gameWindowSize,
      level,
      characterPosition,
      setCharacterPosition,
      isJumping,
      isFalling,
      setIsFalling,
    });

  useEffect(() => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    console.log(Dimensions.get("window").height);
  }, []);

  return level ? (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeValue,
        },
      ]}
    >
      <View
        style={{
          width: "100%",
          height: 100,
          backgroundColor: "#F4CDD4",

          position: "absolute",
          top: -100,
          left: 0,

          zIndex: 100,
        }}
      />

      {/* PAUSE BTN */}
      <TouchableOpacity
        style={styles.pauseBtn}
        onPress={() => setIsPaused(true)}
      >
        <FontAwesomeIcon icon={faPause} size={24} color={"#fff"} />
      </TouchableOpacity>

      <Pause visibility={isPaused} setVisibility={setIsPaused} />

      <Text
        style={{
          margin: 12,

          fontSize: 24,
          position: "absolute",
          top: 0,

          zIndex: 10,
        }}
      >
        Level: {levelCounter}
      </Text>

      <CoinCounter coinCounter={coinCounter} />

      <GameContainer
        level={level}
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

      <View
        style={{
          justifyContent: "center",
          backgroundColor: "#eee",
          position: "absolute",
          top: 10,
          left: 10,

          opacity: 1,
        }}
      >
        <Text>Scale: {width >= 768 ? width / (width / 2) : 1}</Text>
        <Text>
          WIDTH: {width} - HEIGHT: {height}
        </Text>
        <Text>
          GAME WIDTH: {columns * 20} - GAME HEIGHT: {rows * 20}
        </Text>
        <Text>LEVEL: {levelCounter}</Text>
        <Text>DIRECTION: {direction}</Text>
        <Text>isMoving: {isMoving ? "SI" : "NO"}</Text>
        <Text>canDescend: {canDescend ? "SI" : "NO"}</Text>
        <Text>canClimb: {canClimb ? "SI" : "NO"}</Text>
        <Text>isFalling: {isFalling ? "SI" : "NO"}</Text>
        <Text>
          X: {characterPosition.x} - Y: {characterPosition.y}
        </Text>
      </View>

      <Controls
        level={level}
        characterSize={characterSize}
        characterPosition={characterPosition}
        setCharacterPosition={setCharacterPosition}
        direction={direction}
        isMoving={isMoving}
        setIsMoving={setIsMoving}
        setDirection={setDirection}
        setIsKicking={setIsKicking}
        canClimb={canClimb}
        canDescend={canDescend}
        isClimbing={isClimbing}
        setClimbLeg={setClimbLeg}
        setIsClimbing={setIsClimbing}
        isJumping={isJumping}
        setIsJumping={setIsJumping}
        isFalling={isFalling}
        setIsFalling={setIsFalling}
      />
    </Animated.View>
  ) : (
    <Text>LOADING</Text>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    width: "100%",
    height: "100%",

    backgroundColor: "#F4CDD4",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: "100%",
    backgroundColor: "#F4CDD4",
  },

  pauseBtn: {
    margin: 12,
    backgroundColor: "#1386A1",

    padding: 12,

    borderRadius: 6,

    position: "absolute",
    top: 0,
    left: 0,

    zIndex: 10,
  },
});

export default Game;
