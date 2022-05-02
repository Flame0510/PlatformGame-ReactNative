import { useEffect } from "react";
import { CharacterPosition } from "../models/CharacterPosition";
import { GameWindowSize } from "../models/GameWindow";
import { Level } from "../models/Level";
import { useCollision } from "./useCollision";

export const useGravity = ({
  tick,
  gameWindowSize,
  level,
  characterPosition,
  setCharacterPosition,
  isJumping,
  isFalling,
  setIsFalling,
}: {
  tick: number;
  gameWindowSize: GameWindowSize;
  level: Level;
  characterPosition: CharacterPosition;
  setCharacterPosition: (characterPosition: CharacterPosition) => void;
  isJumping: boolean;
  isFalling: boolean;
  setIsFalling: (isFalling: boolean) => void;
}) => {
  let gravityInterval: any;

  const { collisionY } = useCollision({ level, characterPosition });

  const gravity = (tick: number) => {
    gravityInterval = setInterval(() => {
      //console.log("TICK");

      //console.log("IS JUMPING: ", isJumping);

      //console.log(characterPosition.y);

      //isFalling && collision();

      if (isFalling) {
        if (!collisionY()) {
          characterPosition.y -= 20;

          setCharacterPosition({ ...characterPosition });
        } else {
          setIsFalling(false);

          characterPosition.x % 20 !== 0 &&
            (characterPosition.x = Math.ceil(characterPosition.x / 20) * 20);

          characterPosition.y % 20 !== 0 &&
            (characterPosition.y = Math.ceil(characterPosition.y / 20) * 20);

          characterPosition.y < 0 && (characterPosition.y = 0);

          setCharacterPosition({ ...characterPosition });

          clearInterval(gravityInterval);
        }
      } else {
        clearInterval(gravityInterval);
      }
    }, tick);
  };

  useEffect(() => {
    gravity(1);
    return () => clearInterval(gravityInterval);
  }, [isJumping, isFalling]);
};
