import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  TouchableOpacityBase,
  View,
  StyleSheet,
  Text,
  Animated,
} from "react-native";

const Controls = ({
  characterPosition,
  setCharacterPosition,
  jump,
  isFalling,
}: {
  characterPosition: any;
  setCharacterPosition: (characterPosition: any) => void;
  jump: () => void;
  isFalling: boolean;
}) => {
  const [isMoving, setIsMoving] = useState(false);

  const moveVelocity = 20;

  let moveInterval: any;

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

    if (!isFalling) {
      switch (direction) {
        case "left":
          /* clearInterval(moveInterval);

          setIsMoving(true);

          moveInterval = setInterval(() => {
            characterPosition.x -= 10;
            setCharacterPosition({ ...characterPosition });

            //console.log(isMoving);
          }, 100); */

          characterPosition.x -= moveVelocity;
          setCharacterPosition({ ...characterPosition });
          break;

        case "right":
          characterPosition.x += moveVelocity;
          setCharacterPosition({ ...characterPosition });
          break;

        case "up":
          characterPosition.y += moveVelocity;
          setCharacterPosition({ ...characterPosition });
          break;

        case "down":
          characterPosition.y -= moveVelocity;
          setCharacterPosition({ ...characterPosition });
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
          style={styles.controlBtn}
          onPressIn={() => move("up")}
          onPressOut={() => setIsMoving(false)}
        >
          <Text>UP</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.controlBtn}
            onPressIn={() => move("left")}
            onPressOut={
              () => console.log("PRESSOUT")
              /* clearInterval(moveInterval) */
            }
          >
            <Text>LEFT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlBtn}
            onPressIn={() => move("right")}
            onPressOut={() => clearInterval()}
          >
            <Text>RIGHT</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.controlBtn}
          onPressIn={() => move("down")}
          onPressOut={() => clearInterval(moveInterval)}
        >
          <Text>DOWN</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.controlBtn} onPress={jump}>
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

    backgroundColor: "gray",

    //position: "absolute",
  },

  leftContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  controlBtn: {
    margin: 10,
    backgroundColor: "lightblue",
    padding: 16,
    opacity: 0.5,
  },
});

export default Controls;
