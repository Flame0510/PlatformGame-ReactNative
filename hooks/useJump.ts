import { useState } from "react";
import { gameRowsColumns } from "../environment/gameContainer";
import { CharacterPosition } from "../models/CharacterPosition";
import { Direction } from "../models/Direction";
import { useCollision } from "./useCollision";

export const useJump = ({
  characterPosition,
  setCharacterPosition,

  collisionX,

  setDirection,

  setIsClimbing,

  isJumping,
  setIsJumping,

  isFalling,
  setIsFalling,
}: {
  characterPosition: CharacterPosition;
  setCharacterPosition: (characterPosition: CharacterPosition) => void;

  collisionX: (direction: Direction | undefined) => boolean;

  setDirection: (direction: Direction) => void;

  setIsClimbing: (isClimbing: boolean) => void;

  isJumping: boolean;
  setIsJumping: (isJumping: boolean) => void;

  isFalling: boolean;
  setIsFalling: (isFalling: boolean) => void;
}) => {
  const { rows, columns } = gameRowsColumns;

  let jumpInterval: NodeJS.Timer;

  //JUMP
  const jump = (direction?: Direction | undefined) => {
    // console.log("JUMP: ", isJumping);
    // console.log("FALL: ", isFalling);

    const y = Math.ceil(characterPosition.y / 20);

    const initialJumpHeight = 80;

    const jumpHeight =
      y < rows - initialJumpHeight / 20
        ? 80
        : initialJumpHeight - rows - initialJumpHeight / 20;

    //console.log(y + "<" + (rows - jumpHeight / 20));

    if (
      y < rows - jumpHeight / 20 &&
      !collisionX(direction) &&
      !isJumping &&
      !isFalling
    ) {
      setIsClimbing(false);
      setIsJumping(true);

      const targetY = characterPosition.y + jumpHeight;

      jumpInterval = setInterval(() => {
        if (characterPosition.y < targetY) {
          characterPosition.y += 10;

          direction === "right"
            ? ((characterPosition.x += jumpHeight / 4 / 8),
              setDirection("right"))
            : direction === "left" &&
              ((characterPosition.x -= jumpHeight / 4 / 8),
              setDirection("left"));

          setCharacterPosition({ ...characterPosition });
        } else {
          clearInterval(jumpInterval);
          setIsJumping(false);
          setIsFalling(true);
        }
      }, 25);
    }
  };

  const blockJump = () => {
    clearInterval(jumpInterval);
  };

  return { jump, blockJump };
};
