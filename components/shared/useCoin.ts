import { useEffect } from "react";
import { gameRowsColumns } from "../../environment/gameContainer";
import { CharacterPosition } from "../../models/CharacterPosition";
import { Level } from "../../models/Level";

export const useCoin = ({
  level,
  setLevel,
  setCoinCounter,
  characterPosition,
  isMoving,
  isFalling,
}: {
  level: Level;
  setLevel: (level: Level) => void;
  setCoinCounter: (coinCounter: number) => void;
  characterPosition: CharacterPosition;
  isMoving: boolean;
  isFalling: boolean;
}) => {
  const { rows, columns } = gameRowsColumns;

  const checkCoin = () => {
    const x = Math.ceil(characterPosition.x / 20);
    let y = Math.ceil(characterPosition.y / 20);

    y > columns - 1 ||
      y + 1 > columns - 1 ||
      (y + 2 > columns - 1 && (y = columns));

    console.log("Y:", y);

    level[y][x] === "c" &&
      ((level[y][x] = 0), setCoinCounter((counter: number) => counter + 1));
    level[y + 1][x] === "c" &&
      ((level[y + 1][x] = 0), setCoinCounter((counter: number) => counter + 1));
    level[y + 2][x] === "c" &&
      ((level[y + 2][x] = 0), setCoinCounter((counter: number) => counter + 1));
  };

  useEffect(() => {
    checkCoin();
  }, [characterPosition]);
};
