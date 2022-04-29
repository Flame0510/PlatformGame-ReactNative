import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Character = ({
  characterSize,
  characterPosition,
  direction,
  isMoving,
  isClimbing,
  climbLeg,
  isKicking,
  isJumping,
  isFalling,
}: any) => {
  return (
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
          style={[
            {
              width: characterSize.width / 2,
              height:
                characterSize.height /
                (climbLeg === "left" && isClimbing ? 2 : isJumping ? 5 : 3),

              backgroundColor: "blue",
            },
            (isMoving || isJumping) &&
              !isClimbing && {
                bottom: 5,
                right: 5,
                transform: [{ rotate: "45deg" }],
              },
            isKicking &&
              direction === "left" && {
                bottom: 5,
                right: 5,
                transform: [{ rotate: "90deg" }],
              },
          ]}
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
          style={[
            {
              width: characterSize.width / 2,
              height:
                characterSize.height /
                (climbLeg === "right" && isClimbing ? 2 : isJumping ? 5 : 3),

              backgroundColor: "blue",
            },
            (isMoving || isJumping) &&
              !isClimbing && {
                bottom: 5,
                left: 5,
                transform: [{ rotate: "-45deg" }],
              },
            isKicking &&
              direction === "right" && {
                bottom: 5,
                left: 5,
                transform: [{ rotate: "-90deg" }],
              },
          ]}
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
  );
};

const styles = StyleSheet.create({
  character: {
    position: "absolute",

    zIndex: 1,
  },
});

export default Character;
