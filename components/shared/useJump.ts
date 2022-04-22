import { useEffect } from "react";
import { CharacterPosition } from "../../models/CharacterPosition";

export const useJump = (
  characterPosition: CharacterPosition,
  setCharacterPosition: (characterPosition: CharacterPosition) => void,
  isJumping: boolean,
  setIsJumping: (isJumping: boolean) => void,
  isFalling: boolean,
  setIsFalling: (isFalling: boolean) => void
) => {
  useEffect(() => {
    console.log("JUMP: ", isJumping);
    console.log("FALL: ", isFalling);

    if (!isJumping && !isFalling) {
      setIsJumping(true);
      const targetY = characterPosition.y + 100;

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
    }
  }, []);
};
