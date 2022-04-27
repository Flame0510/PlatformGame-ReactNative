import { useEffect } from "react";
import { CharacterPosition } from "../../models/CharacterPosition";
import { Level } from "../../models/Level";

export const useClimb = ({
  level,
  characterPosition,

  setCanClimb,

  isClimbing,
  setIsClimbing,

  setCanDescend,

  isMoving,
  isJumping,
  isFalling,
}: {
  level: Level;
  characterPosition: CharacterPosition;

  setCanClimb: (canClimb: boolean) => void;

  isClimbing: boolean;
  setIsClimbing: (isClimbing: boolean) => void;

  setCanDescend: (canDescend: boolean) => void;

  isMoving: boolean;
  isJumping: boolean;
  isFalling: boolean;
}) => {
  const checkClimb = () => {
    const x = Math.ceil(characterPosition.x / 20);
    const y = Math.ceil(characterPosition.y / 20);

    console.log("CAN CLIMB: ", level[y][x] === "s");

    setCanClimb(level[y][x] === "s");

    setCanDescend(y > 1 && level[y - 1][x] === 1 && level[y - 2][x] === "s");

    //isFalling && canClimb && (setIsFalling(false), setIsClimbing(true));
  };

  useEffect(() => {
    checkClimb();
  }, [isMoving, isClimbing, isJumping, isFalling]);

  return checkClimb;
};
