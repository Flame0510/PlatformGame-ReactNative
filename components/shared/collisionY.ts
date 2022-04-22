import { CharacterPosition } from "../../models/CharacterPosition";

export const collisionY = (
  mapArray: [][],
  characterPosition: CharacterPosition
) => {
  console.log("\n\nNEW \n\n\n");

  let block = false;

  characterPosition.y > 0
    ? mapArray.map((row, rowKey) => {
        console.log("ROW KEY", rowKey * 20);

        row.map((element, key) => {
          const r =
            element === 1 &&
            characterPosition.y - 20 === rowKey * 20 &&
            characterPosition.x === key * 20;
          /* characterPosition.y > rowKey * 20 &&
          characterPosition.x > key * 20 &&
          characterPosition.x < row[key + 1] * 20; */

          console.log(
            characterPosition.y - 20 + " = " + rowKey * 20 + "----r:" + r
          );

          //console.log(element + ": " + key * 20 + " - " + row[key + 1] * 20);
          r && (block = true);
        });
      })
    : (block = true);

  console.log("BLOCK ", block);

  return block;
};
