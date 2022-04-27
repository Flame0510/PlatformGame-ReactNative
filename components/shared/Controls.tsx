import React, { useEffect } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Animated,
} from "react-native";
import { gameRowsColumns } from "../../environment/gameContainer";
import { CharacterPosition } from "../../models/CharacterPosition";
import { Level } from "../../models/Level";
import { collisionY } from "./collisionY";

const Controls = ({
  level,

  characterSize,
  characterPosition,
  setCharacterPosition,

  setDirection,

  canClimb,

  canDescend,

  isClimbing,
  setIsClimbing,
  setClimbLeg,

  isMoving,
  setIsMoving,

  isJumping,
  setIsJumping,

  isFalling,
  setIsFalling,
}: {
  level: Level;

  characterSize: { width: number; height: number };
  characterPosition: CharacterPosition;
  setCharacterPosition: (characterPosition: any) => void;

  setDirection: (direction: "right" | "left") => void;

  canClimb: boolean;

  canDescend: boolean;

  isClimbing: boolean;
  setIsClimbing: (isClimb: boolean) => void;
  setClimbLeg: (climbLeg: "right" | "left") => void;

  isMoving: boolean;
  setIsMoving: (isMoving: boolean) => void;

  isJumping: boolean;
  setIsJumping: (isJumping: boolean) => void;

  isFalling: boolean;
  setIsFalling: (isFalling: boolean) => void;
}) => {
  const { rows, columns } = gameRowsColumns;

  const moveVelocity = 20;

  let moveInterval: any;

  //COLLISION X
  const collisionX = (direction: string) => {
    const x = Math.ceil(characterPosition.x / 20);
    const y = Math.ceil(characterPosition.y / 20);

    console.log("COLL Y: ", y);

    console.log("COLL POS: ", level[y][x + 1] === 1);

    console.log("X POS: ", x + 1);

    return direction === "right"
      ? x + 1 > columns - 1 || level[y][x + 1] === 1
      : x - 1 < 0 || level[y][x + 1] === 1;
  };

  //JUMP
  const jump = () => {
    console.log("JUMP: ", isJumping);
    console.log("FALL: ", isFalling);

    const y = Math.ceil(characterPosition.y / 20);

    const jumpHeight = 80;

    console.log(y + 2 + "<" + (columns - 1));

    if (y + 2 < columns - jumpHeight / 20 && !isJumping && !isFalling) {
      setIsClimbing(false);
      setIsJumping(true);

      const targetY = characterPosition.y + jumpHeight;

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

  const move = (direction: string) => {
    /* switch (direction) {
      case "left":
        Animated.timing(characterPosition.animatedValues.x, {
          toValue: characterPosition.values.x - 10,
          duration: 100,
          useNativeDriver: true,
        }).start(() => (characterPosition.values.x -= 10));
        break;

      case "right":
        Animated.timing(characterPosition.animatedValues.x, {
          toValue: characterPosition.values.x + 10,
          duration: 100,
          useNativeDriver: true,
        }).start(() => (characterPosition.values.x += 10));
        break;
s
      case "up":
        break;

      case "down":
        break;
    } */

    if (!isMoving && !isFalling) {
      switch (direction) {
        case "left":
          setIsClimbing(false);

          setDirection("left");

          if (!collisionX("left")) {
            const target = characterPosition.x - moveVelocity;

            moveInterval = setInterval(() => {
              if (characterPosition.x - 10 >= target) {
                characterPosition.x -= 10;
                setCharacterPosition({ ...characterPosition });
                setIsMoving(true);
              } else {
                clearInterval(moveInterval);
                setIsMoving(false);
                !collisionY(level, characterPosition) && setIsFalling(true);
              }
            }, 1);
          }
          break;

        case "right":
          setDirection("right");

          setIsClimbing(false);

          if (!collisionX("right")) {
            const target = characterPosition.x + moveVelocity;

            moveInterval = setInterval(() => {
              if (characterPosition.x + 10 <= target) {
                characterPosition.x += 10;
                setCharacterPosition({ ...characterPosition });
                setIsMoving(true);
              } else {
                clearInterval(moveInterval);
                setIsMoving(false);
                !collisionY(level, characterPosition) && setIsFalling(true);
              }
            }, 1);
          }
          break;

        case "up":
          let y = characterPosition.y / 20;

          isClimbing &&
            setClimbLeg((climbLeg: "right" | "left") =>
              climbLeg === "right" ? "left" : "right"
            );

          if (canClimb) {
            characterPosition.y += moveVelocity;
            setCharacterPosition({ ...characterPosition });
            setIsClimbing(true);
            setIsMoving(true);
          } else if (isClimbing) {
            characterPosition.y += moveVelocity;
            setCharacterPosition({ ...characterPosition });
            setIsClimbing(false);
            setIsMoving(false);
          }
          break;

        case "down":
          if (characterPosition.y > 0) {
            /* const target = characterPosition.y - moveVelocity;

            moveInterval = setInterval(() => {
              if (characterPosition.y - 10 <= target) {
                characterPosition.y -= 10;
                setCharacterPosition({ ...characterPosition });
                setIsMoving(true);
              } else {
                clearInterval(moveInterval);
                setIsMoving(false);
              }
            }, 1); */

            characterPosition.y -= 20;
            setCharacterPosition({ ...characterPosition });

            isClimbing
              ? setClimbLeg((climbLeg: "right" | "left") =>
                  climbLeg === "right" ? "left" : "right"
                )
              : canDescend
              ? setIsClimbing(true)
              : setIsFalling(true);

            characterPosition.y <= 0 && setIsClimbing(false);

            // : setIsFalling(true);
          }
          break;
      }
    }
  };

  useEffect(() => {
    console.log(isMoving);

    !isMoving && clearInterval(moveInterval);
  }, [isMoving]);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity
          style={[styles.controlBtn, { width: 50, height: 50 }]}
          onPressIn={() => (canClimb ? move("up") : jump())}
          onPressOut={() => setIsMoving(false)}
        />

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.controlBtn, { width: 100, height: 50 }]}
            onPressIn={() => move("left")}
            onPressOut={
              () => console.log("PRESSOUT")
              /* clearInterval(moveInterval) */
            }
          />
          <TouchableOpacity
            style={[styles.controlBtn, { width: 100, height: 50 }]}
            onPressIn={() => move("right")}
            onPressOut={() => clearInterval()}
          />
        </View>

        <TouchableOpacity
          style={[styles.controlBtn, { width: 50, height: 50 }]}
          onPressIn={() => move("down")}
          onPressOut={() => clearInterval(moveInterval)}
        />
      </View>

      <TouchableOpacity
        style={[styles.controlBtn, { height: 200 }]}
        onPress={jump}
      >
        <Text style={styles.colorBtnText}>JUMP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",

    //backgroundColor: "#1c1c1c",

    paddingHorizontal: 20,
    paddingVertical: 40,

    position: "absolute",
    bottom: 0,
  },

  leftContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  controlBtn: {
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#333",
    padding: 16,
  },

  colorBtnText: {
    color: "#fff",
  },
});

export default Controls;
