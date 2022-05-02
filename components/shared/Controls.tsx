import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { gameRowsColumns } from "../../environment/gameContainer";
import { CharacterPosition } from "../../models/CharacterPosition";
import { Level } from "../../models/Level";
import { useCollision } from "../../hooks/useCollision";
import { useJump } from "../../hooks/useJump";

let pressed = false;
let pressedInterval: NodeJS.Timer;

const Controls = ({
  level,

  characterSize,
  characterPosition,
  setCharacterPosition,

  direction,
  setDirection,

  isMoving,
  setIsMoving,

  setIsKicking,

  canClimb,

  canDescend,

  isClimbing,
  setIsClimbing,
  setClimbLeg,

  isJumping,
  setIsJumping,

  isFalling,
  setIsFalling,
}: {
  level: Level;

  characterSize: { width: number; height: number };
  characterPosition: CharacterPosition;
  setCharacterPosition: (characterPosition: any) => void;

  direction: "right" | "left";
  setDirection: (direction: "right" | "left") => void;

  setIsKicking: (isKicking: boolean) => void;

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

  const { collisionX, collisionY } = useCollision({ level, characterPosition });

  const { jump } = useJump({
    characterPosition,
    setCharacterPosition,

    setDirection,

    setIsClimbing,

    isJumping,
    setIsJumping,

    isFalling,
    setIsFalling,
  });

  //KICK
  const kick = () => {
    let x = Math.ceil(characterPosition.x / 20);
    const y = Math.ceil(characterPosition.y / 20);

    setIsKicking(true);

    x = direction === "right" ? x + 1 : x - 1;

    const levelTile = level[y][x];

    level[y][x] === "e" && (level[y][x] = 0);

    setTimeout(() => setIsKicking(false), 100);
  };

  //CREATE
  const create = () => {
    let x = Math.ceil(characterPosition.x / 20);
    const y = Math.ceil(characterPosition.y / 20);

    //x = direction === "right" ? x + 1 : x - 1;

    level[y + 3][x] === 0 && (level[y + 3][x] = 1);

    setIsKicking(true);
    setTimeout(() => setIsKicking(false), 100);
  };

  //MOVE
  const move = (direction: string) => {
    clearInterval(pressedInterval);

    if (!isMoving && !isJumping && !isFalling) {
      switch (direction) {
        case "left":
          setIsClimbing(false);

          pressed = true;

          setDirection("left");

          if (!collisionX("left")) {
            let target = characterPosition.x - moveVelocity;

            /* characterPosition.x -= 20;
            setCharacterPosition({ ...characterPosition });
            setIsMoving(true);
            setIsMoving(false);
            !collisionY() ? setIsFalling(true) : pressed && move("left"); */

            moveInterval = setInterval(() => {
              if (characterPosition.x - 10 >= target) {
                characterPosition.x -= 10;
                setCharacterPosition({ ...characterPosition });
                setIsMoving(true);
              } else {
                clearInterval(moveInterval);
                setIsMoving(false);
                !collisionY() ? setIsFalling(true) : pressed && move("left");
              }
            }, 50);
          }

          break;

        case "right":
          setIsClimbing(false);

          pressed = true;

          setDirection("right");

          if (!collisionX("right")) {
            let target = characterPosition.x + moveVelocity;

            /* characterPosition.x += 20;
            setCharacterPosition({ ...characterPosition });
            setIsMoving(true);
            setIsMoving(false);
            !collisionY() ? setIsFalling(true) : pressed && move("right"); */

            moveInterval = setInterval(() => {
              if (characterPosition.x + 10 <= target) {
                characterPosition.x += 10;
                setCharacterPosition({ ...characterPosition });
                setIsMoving(true);
              } else {
                clearInterval(moveInterval);
                setIsMoving(false);
                !collisionY() ? setIsFalling(true) : pressed && move("right");
              }
            }, 50);
          }

          break;

        case "up":
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
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={[
              styles.controlBtn,
              {
                width: 50,
                height: 50,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
              },
            ]}
            onPressIn={() => jump("left")}
            onPressOut={() => setIsMoving(false)}
          />

          <TouchableOpacity
            style={[
              styles.controlBtn,
              {
                width: 50,
                height: 80,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
              },
            ]}
            onPressIn={() => (canClimb ? move("up") : jump())}
            onPressOut={() => setIsMoving(false)}
          />

          <TouchableOpacity
            style={[
              styles.controlBtn,
              {
                width: 50,
                height: 50,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
              },
            ]}
            onPressIn={() => jump("right")}
          />
        </View>

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.controlBtn,
              {
                width: 100,
                height: 50,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
              },
            ]}
            onPressIn={() => move("left")}
            onPressOut={() => (pressed = false)}
          >
            <Text>{"<--"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.controlBtn,
              {
                width: 100,
                height: 50,
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
              },
            ]}
            onPressIn={() => move("right")}
            onPressOut={() => (pressed = false)}
          >
            <Text>{"-->"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.controlBtn,
            {
              width: 50,
              height: 80,
              borderBottomLeftRadius: 6,
              borderBottomRightRadius: 6,
            },
          ]}
          onPressIn={() => move("down")}
          onPressOut={() => setIsMoving(false)}
        />
      </View>
      <View>
        <TouchableOpacity
          style={[styles.controlBtn, styles.actionBtn]}
          onPress={kick}
        >
          <Text style={styles.btnText}>Kick</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlBtn, styles.actionBtn]}
          onPress={create}
        >
          <Text style={styles.btnText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",

    width: "100%",
    height: "40%",

    //backgroundColor: "gray",

    paddingHorizontal: 20,
    paddingVertical: 40,

    position: "absolute",
    bottom: 0,

    opacity: 0.5,
  },

  leftContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  controlBtn: {
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#1386A1",
    padding: 16,
  },

  actionBtn: {
    width: 80,
    height: 100,

    borderRadius: 6,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Controls;
