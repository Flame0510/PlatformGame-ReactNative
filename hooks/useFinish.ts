import { CharacterPosition } from "./../models/CharacterPosition";
import { useEffect } from "react";
import { Level } from "../models/Level";
import { gameRowsColumns } from "../environment/gameContainer";

export const useFinish = ({
  level,
  createLevel,
  setLevelCounter,
  characterPosition,
  isMoving,
  isJumping,
  isFalling,
}: {
  level: Level;
  createLevel: () => void;
  setLevelCounter: (levelCounter: number) => void;
  characterPosition: CharacterPosition;
  isMoving: boolean;
  isJumping: boolean;
  isFalling: boolean;
}) => {
  const { rows, columns } = gameRowsColumns;

  const checkFinish = () => {
    const x = Math.ceil(characterPosition.x / 20);
    let y = Math.ceil(characterPosition.y / 20);

    y > columns - 1 ||
      y + 1 > columns - 1 ||
      (y + 2 > columns - 1 && (y = columns));

    return (
      y + 2 < rows - 1 &&
      (level[y][x] === "f" ||
        level[y + 1][x] === "f" ||
        level[y + 2][x] === "f")
    );
  };

  useEffect(() => {
    if (checkFinish()) {
      createLevel();
      setLevelCounter((levelCounter: number) => levelCounter + 1);
    }
  }, [characterPosition]);
};
