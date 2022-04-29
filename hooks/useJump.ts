import { gameRowsColumns } from "../environment/gameContainer";
import { CharacterPosition } from "../models/CharacterPosition";
import { Direction } from "../models/Direction";

export const useJump = ({
  characterPosition,
  setCharacterPosition,

  setDirection,

  setIsClimbing,

  isJumping,
  setIsJumping,

  isFalling,
  setIsFalling,
}: {
  characterPosition: CharacterPosition;
  setCharacterPosition: (characterPosition: CharacterPosition) => void;

  setDirection: (direction: Direction) => void;

  setIsClimbing: (isClimbing: boolean) => void;

  isJumping: boolean;
  setIsJumping: (isJumping: boolean) => void;

  isFalling: boolean;
  setIsFalling: (isFalling: boolean) => void;
}) => {
  const { rows, columns } = gameRowsColumns;

  //JUMP
  const jump = (direction?: Direction | undefined) => {
    console.log("JUMP: ", isJumping);
    console.log("FALL: ", isFalling);

    const y = Math.ceil(characterPosition.y / 20);

    const initialJumpHeight = 80;

    const jumpHeight =
      y < rows - initialJumpHeight / 20
        ? 80
        : initialJumpHeight - rows - initialJumpHeight / 20;

    console.log(y + "<" + (rows - jumpHeight / 20));

    if (y < rows - jumpHeight / 20 && !isJumping && !isFalling) {
      setIsClimbing(false);
      setIsJumping(true);

      const targetY = characterPosition.y + jumpHeight;

      const jumpInterval = setInterval(() => {
        if (characterPosition.y < targetY) {
          characterPosition.y += 10;

          setCharacterPosition({ ...characterPosition });
        } else {
          direction === "right"
            ? ((characterPosition.x += 20), setDirection("right"))
            : direction === "left" &&
              ((characterPosition.x -= 20), setDirection("left"));

          setCharacterPosition({ ...characterPosition });

          clearInterval(jumpInterval);
          setIsJumping(false);
          setIsFalling(true);
        }
      }, 1);
    }
  };

  return { jump };
};
