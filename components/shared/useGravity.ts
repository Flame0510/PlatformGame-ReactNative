import { useEffect } from "react";
import { CharacterPosition } from "../../models/CharacterPosition";
import { GameWindowSize } from "../../models/GameWindow";
import { collisionY } from "./collisionY";

export const useGravity = (
  tick: number,
  gameWindowSize: GameWindowSize,
  mapArray: [][],
  characterPosition: CharacterPosition,
  setCharacterPosition: (characterPosition: CharacterPosition) => void,
  isJumping: boolean,
  isFalling: boolean,
  setIsFalling: (isFalling: boolean) => void
) => {
  let gravityInterval: any;

  const gravity = (tick: number) => {
    gravityInterval = setInterval(() => {
      //sconsole.log("TICK");

      //console.log("IS JUMPING: ", isJumping);

      //console.log(characterPosition.y);

      //isFalling && collision();

      if (isFalling) {
        if (!collisionY(mapArray, characterPosition)) {
          //setIsFalling(true);
          /* let {
          values: { x, y },
        } = characterPosition; */

          //console.log("TRASUTO");

          characterPosition.y -= 20;

          setCharacterPosition({ ...characterPosition });

          /* setCharacterPosition(({ x, y }) => {
            //const cpy = y < gameWindowSize.height - characterSize.height - 2 ? y++ : y;

            console.log(
              "RIVAU?: ",
              y < gameWindowSize.height - characterSize.height
            );

            console.log(
              "FUNZIONE: ",
              y + " < " + (gameWindowSize.height - characterSize.height)
            );

            console.log("Y: ", characterPosition.y);

            console.log(gameWindowSize.height);

            y + 2;

            return {
              x,
              y,
            };
          }); */

          /* Animated.timing(characterPosition.animatedValues.y, {
          toValue: y,
          duration: 100,
          useNativeDriver: true,
        }).start(() => {
          setIsJumping(false);
          characterPosition.values.y = cpy;
        }); */
        } else {
          setIsFalling(false);
        }
      }
    }, tick);
  };

  useEffect(() => {
    gameWindowSize && gravity(1);
    return () => clearInterval(gravityInterval);
  }, [gameWindowSize, characterPosition, isJumping, isFalling]);
};
