import { CharacterPosition } from "../../models/CharacterPosition";
import { Level } from "../../models/Level";

export const collisionY = (
  level: Level,
  characterPosition: CharacterPosition
) => {
  console.log("\n\nCOLL Y NEW \n\n\n");

  const x = Math.ceil(characterPosition.x / 20);
  const y = Math.ceil(characterPosition.y / 20);

  const levelElement = y > 0 && level[y - 1][x];

  return y <= 0 || levelElement === 1 || levelElement === "b";
};
