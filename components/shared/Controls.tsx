import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  TouchableOpacityBase,
  View,
  StyleSheet,
  Text,
  Animated,
} from "react-native";
import { collisionY } from "./collisionY";

const Controls = ({
  mapArray,
  characterPosition,
  setCharacterPosition,
  jump,
  isFalling,
  setIsFalling,
}: {
  mapArray: [][];
  characterPosition: any;
  setCharacterPosition: (characterPosition: any) => void;
  jump: () => void;
  isFalling: boolean;
  setIsFalling: (isFalling: boolean) => void;
}) => {
  const [isMoving, setIsMoving] = useState(false);

  const moveVelocity = 20;

  let moveInterval: any;

  const collisionX = (direction: string) => {
    let block = false;

    const collision = mapArray.map((row, rowKey) => {
      console.log("ROW KEY", /* (mapArray.length - rowKey) */ rowKey * 20);

      console.log(rowKey * 20 <= 60);

      rowKey * 20 + characterPosition.y < 20 &&
        row.map((element, key) => {
          const futurePosition =
            direction === "left"
              ? characterPosition.x - moveVelocity
              : direction === "right" && characterPosition.x + moveVelocity;
          const r = element === 1 && futurePosition === key * 20;

          /* console.log(
                element +
                  ": " +
                  key * 20 +
                  "---r: " +
                  r +
                  "---------" +
                  (characterPosition.x - moveVelocity) +
                  " < " +
                  key * 20
              ); */

          r && (block = true);
          return r;
        });

      //console.log("RrOw: ", rRow);
    });

    console.log("BLOCK: ", block);

    return block;
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

    if (!isFalling && !isMoving) {
      switch (direction) {
        case "left":
          /* clearInterval(moveInterval);

          setIsMoving(true);

          moveInterval = setInterval(() => {
            characterPosition.x -= 10;
            setCharacterPosition({ ...characterPosition });

            //console.log(isMoving);
          }, 100); */

          //console.log(collision);
          if (!collisionX("left")) {
            /* characterPosition.x -= moveVelocity;
            setCharacterPosition({ ...characterPosition }); */

            const target = characterPosition.x - moveVelocity;

            moveInterval = setInterval(() => {
              if (characterPosition.x - 10 >= target) {
                characterPosition.x -= 10;
                setCharacterPosition({ ...characterPosition });
                setIsMoving(true);
              } else {
                clearInterval(moveInterval);
                setIsMoving(false);
                !collisionY(mapArray, characterPosition) && setIsFalling(true);
              }
            }, 1);
          }
          break;

        case "right":
          if (!collisionX("right")) {
            /* characterPosition.x += moveVelocity;
            setCharacterPosition({ ...characterPosition }); */

            const target = characterPosition.x + moveVelocity;

            moveInterval = setInterval(() => {
              if (characterPosition.x + 10 <= target) {
                characterPosition.x += 10;
                setCharacterPosition({ ...characterPosition });
                setIsMoving(true);
              } else {
                clearInterval(moveInterval);
                setIsMoving(false);
                !collisionY(mapArray, characterPosition) && setIsFalling(true);
              }
            }, 1);
          }
          break;

        case "up":
          characterPosition.y += moveVelocity;
          setCharacterPosition({ ...characterPosition });
          break;

        case "down":
          if (characterPosition.y > 0) {
            characterPosition.y -= moveVelocity;
            setCharacterPosition({ ...characterPosition });
            setIsFalling(true);
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
          style={[styles.controlBtn, { width: 50, height: 100 }]}
          onPressIn={() => move("up")}
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
          style={[styles.controlBtn, { width: 50, height: 100 }]}
          onPressIn={() => move("down")}
          onPressOut={() => clearInterval(moveInterval)}
        />
      </View>

      <TouchableOpacity
        style={[styles.controlBtn, { height: 200 }]}
        onPress={jump}
      >
        <Text>JUMP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",

    backgroundColor: "#1c1c1c",

    paddingHorizontal: 20,
    paddingVertical: 40,

    //position: "absolute",
  },

  leftContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  controlBtn: {
    justifyContent: "center",
    margin: 10,
    backgroundColor: "lightblue",
    padding: 16,
  },
});

export default Controls;
