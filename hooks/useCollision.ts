import { gameRowsColumns } from "../environment/gameContainer";
import { CharacterPosition } from "../models/CharacterPosition";
import { Direction } from "../models/Direction";
import { Level } from "../models/Level";

export const useCollision = ({
  level,
  characterPosition,
}: {
  level: Level;
  characterPosition: CharacterPosition;
}) => {
  const { rows, columns } = gameRowsColumns;

  //COLLISION X
  const collisionX = (direction: Direction) => {
    const x = Math.ceil(characterPosition.x / 20);
    const y = Math.ceil(characterPosition.y / 20);

    /* console.log("COLL Y: ", y);

    console.log("COLL POS: ", level[y][x + 1] === 1);

    console.log("X POS: ", x + 1); */

    return direction === "right"
      ? x + 1 > columns - 1 || level[y][x + 1] === 1
      : x - 1 < 0 || level[y][x + 1] === 1;
  };

  //COLLISION Y
  const collisionY = () => {
    const x = Math.ceil(characterPosition.x / 20);
    const y = Math.ceil(characterPosition.y / 20);

    const levelElement = y > 0 && level[y - 1][x];

    return y <= 0 || levelElement === 1 || levelElement === "b";
  };

  return { collisionX, collisionY };
};
