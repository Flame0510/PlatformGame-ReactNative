import { CharacterPosition } from "./../models/CharacterPosition";
import { useEffect, useState } from "react";
import { Level } from "../models/Level";
import { gameRowsColumns } from "../environment/gameContainer";

export const useFinish = ({
  gameFadeIn,
  gameFadeOut,

  level,
  createLevel,
  setLevelCounter,

  characterPosition,
  setCharacterPosition,

  isMoving,
  setIsMoving,

  isJumping,
  setIsJumping,

  isFalling,
  setIsFalling,
}: {
  gameFadeIn: () => void;
  gameFadeOut: () => void;

  level: Level;
  createLevel: () => void;
  setLevelCounter: (levelCounter: number) => void;

  characterPosition: CharacterPosition;
  setCharacterPosition: (characterPosition: CharacterPosition) => void;

  isMoving: boolean;
  setIsMoving: (isMoving: boolean) => void;

  isJumping: boolean;
  setIsJumping: (isJumping: boolean) => void;

  isFalling: boolean;
  setIsFalling: (isFalling: boolean) => void;
}) => {
  const { rows, columns } = gameRowsColumns;

  const [isFinish, setIsFinish] = useState(false);

  const resetPlayerPosition = () => {
    characterPosition.x = 20;
    characterPosition.y = 0;

    setCharacterPosition({ ...characterPosition });
  };

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
    if (!isFinish && checkFinish()) {
      setIsMoving(false);
      setIsFalling(false);

      setIsFinish(true);

      gameFadeOut();

      setTimeout(() => {
        resetPlayerPosition();

        gameFadeIn();

        setIsFinish(false);

        createLevel();

        setLevelCounter((levelCounter: number) => levelCounter + 1);
      }, 1000);
    }
  }, [characterPosition]);

  return { isFinish };
};
