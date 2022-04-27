import { useEffect } from "react";
import { CharacterPosition } from "../../models/CharacterPosition";
import { Level } from "../../models/Level";
import { collisionY } from "./collisionY";

export const useBridge = ({
  level,
  setLevel,
  levelCounter,
  characterPosition,
  isMoving,
  isFalling,
  setIsFalling,
}: {
  level: Level;
  setLevel: (level: Level) => void;
  levelCounter: number;
  characterPosition: CharacterPosition;
  isMoving: boolean;
  isFalling: boolean;
  setIsFalling: (isFalling: boolean) => void;
}) => {
  const checkBridge = () => {
    const x = Math.ceil(characterPosition.x / 20);
    const y = Math.ceil(characterPosition.y / 20);

    console.log("BRIDGE CHECK: ", y > 0 && level[y - 1][x] === "b");

    if (y > 0 && level[y - 1][x] === "b") {
      setTimeout(() => {
        //REMOVE BRIDGE
        level[y - 1][x] = 0;
        setLevel([...level]);

        //CHECK COLLISION
        !isMoving &&
          !collisionY(level, characterPosition) &&
          setIsFalling(true);

        const levelCounterTemp = levelCounter;

        //RESET BRIDGE
        setTimeout(() => {
          if (levelCounter === levelCounterTemp) {
            level[y - 1][x] = "b";
            setLevel([...level]);
          }
        }, 2000);
      }, 1000);
    }
  };

  useEffect(() => {
    checkBridge();
  }, [isMoving, isFalling]);
};
