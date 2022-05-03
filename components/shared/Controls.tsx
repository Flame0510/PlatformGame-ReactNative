import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { gameRowsColumns } from "../../environment/gameContainer";
import { CharacterPosition } from "../../models/CharacterPosition";
import { Level } from "../../models/Level";
import { useCollision } from "../../hooks/useCollision";
import { useJump } from "../../hooks/useJump";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBolt,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faCaretUp,
  faCube,
  faSquareArrowUpRight,
  faSquareCaretDown,
  faSquareCaretLeft,
  faSquareCaretRight,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";

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

  const width = Dimensions.get("screen").width;

  const isMobile = width < 768;

  const moveVelocity = 20;
  const buttonSize = isMobile ? 64 : 96;
  const buttonColor = "#1386A1";

  let moveInterval: NodeJS.Timer;

  const { collisionX, collisionY } = useCollision({ level, characterPosition });

  const { jump, blockJump } = useJump({
    characterPosition,
    setCharacterPosition,

    collisionX,

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

    if (!isMoving && !isJumping) {
      isJumping && setIsJumping(false);
      isFalling && setIsFalling(false);

      pressed = true;

      switch (direction) {
        case "left":
          setIsClimbing(false);

          pressed = true;

          setDirection("left");

          if (!collisionX("left")) {
            let target = characterPosition.x - moveVelocity;

            moveInterval = setInterval(() => {
              if (characterPosition.x - 10 >= target) {
                characterPosition.x -= 10;
                setCharacterPosition({ ...characterPosition });
                setIsMoving(true);
              } else {
                clearInterval(moveInterval);
                setIsMoving(false);
                //!collisionY() ? setIsFalling(true) : pressed && move("left");
                pressed && move("left");
                !collisionY() &&
                  (pressed ? (characterPosition.y -= 20) : setIsFalling(true));
              }
            }, 50);
          } else {
            !collisionY() && setIsFalling(true);
          }

          break;

        case "right":
          setIsClimbing(false);

          pressed = true;

          setDirection("right");

          if (!collisionX("right") && !isJumping) {
            let target = characterPosition.x + moveVelocity;

            moveInterval = setInterval(() => {
              if (characterPosition.x + 10 <= target) {
                characterPosition.x += 10;
                setCharacterPosition({ ...characterPosition });
                setIsMoving(true);
              } else {
                clearInterval(moveInterval);
                setIsMoving(false);

                //!collisionY() && setIsFalling(true);
                pressed && move("right");
                !collisionY() &&
                  (pressed ? (characterPosition.y -= 20) : setIsFalling(true));
              }
            }, 50);
          } else {
            !collisionY() && setIsFalling(true);
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

            (characterPosition.y <= 0 || collisionY()) && setIsClimbing(false);

            // : setIsFalling(true);
          }
          break;
      }
    }
  };

  useEffect(() => {
    //console.log(isMoving);

    !isMoving && clearInterval(moveInterval);
  }, [isMoving]);

  return (
    <View style={styles.container}>
      <View style={[styles.leftContainer, { maxWidth: isMobile ? 200 : 300 }]}>
        <View style={styles.topBtnContainer}>
          <TouchableOpacity
            style={[styles.controlBtn, { transform: [{ scaleX: -1 }] }]}
            onPressIn={() => jump("left")}
            onLongPress={() => console.log("PREMUTO LUNGO")}
            onPressOut={() => setIsMoving(false)}
          >
            <FontAwesomeIcon
              icon={faSquareArrowUpRight}
              size={buttonSize}
              color={buttonColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlBtn]}
            onPressIn={() => (canClimb ? move("up") : jump())}
            onPressOut={() => setIsMoving(false)}
          >
            <FontAwesomeIcon
              icon={faSquareCaretUp}
              size={buttonSize}
              color={buttonColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlBtn, {}]}
            onPressIn={() => jump("right")}
          >
            <FontAwesomeIcon
              icon={faSquareArrowUpRight}
              size={buttonSize}
              color={buttonColor}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.leftRightBtnContainer}>
          <TouchableOpacity
            style={[styles.controlBtn]}
            onPressIn={() => move("left")}
            onPressOut={() => (pressed = false)}
          >
            <FontAwesomeIcon
              icon={faSquareCaretLeft}
              size={buttonSize}
              color={buttonColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlBtn]}
            onPressIn={() => move("right")}
            onPressOut={() => (pressed = false)}
          >
            <FontAwesomeIcon
              icon={faSquareCaretRight}
              size={buttonSize}
              color={buttonColor}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.controlBtn]}
          onPressIn={() => move("down")}
          onPressOut={() => setIsMoving(false)}
        >
          <FontAwesomeIcon
            icon={faSquareCaretDown}
            size={buttonSize}
            color={buttonColor}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.controlBtn, styles.actionBtn]}
          onPress={kick}
        >
          <FontAwesomeIcon
            icon={faBolt}
            size={buttonSize}
            color={buttonColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlBtn, styles.actionBtn]}
          onPress={create}
        >
          <FontAwesomeIcon
            icon={faCube}
            size={buttonSize}
            color={buttonColor}
          />
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

    marginHorizontal: 24,

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
  topBtnContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",

    width: "100%",
  },
  leftRightBtnContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",

    width: "100%",
  },
  controlBtn: {
    // justifyContent: "center",
    // alignItems: "center",s
    //backgroundColor: "#1386A1",
    //padding: 16,
  },

  actionBtn: { margin: 12 },

  btnText: {
    color: "#1386A1",
    fontFamily: "workSans",
    textAlign: "center",
  },
});

export default Controls;
