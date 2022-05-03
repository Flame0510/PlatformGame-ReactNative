import { useEffect } from "react";
import { gameRowsColumns } from "../environment/gameContainer";
import { CharacterPosition } from "../models/CharacterPosition";
import { Level } from "./../models/Level";

export const useLevel = ({
  level,
  setLevel,
  characterPosition,
}: {
  level: Level;
  setLevel: (level: Level) => void;
  characterPosition: CharacterPosition;
}) => {
  const { rows, columns } = gameRowsColumns;

  const createLevel = () => {
    const rowsWithPlatforms: number[] = [];

    const x = Math.ceil(characterPosition.x / 20);
    const y = Math.ceil(characterPosition.y / 20);

    console.log("\nNEW MAP\n\n\n");

    const minX = characterPosition.x / 20 < columns / 2 ? columns / 2 - 1 : 0;
    const maxX =
      characterPosition.x / 20 < columns / 2 ? columns - 1 : columns / 2 - 1;

    //console.log("MIN X: " + minX + "---MAX X: " + maxX);

    //FINISH POSITION
    const finishPosition = {
      x: Math.ceil(Math.random() * (maxX - minX) + minX),
      y: Math.ceil(Math.random() * (rows - 2) + 2),
    };

    finishPosition.y + 1 > rows - 3 &&
      (finishPosition.y = finishPosition.y -= 3);

    //console.warn("FINISH POS: ", finishPosition);
    let lastRowHavePlatform = 0;
    let lastStartPoint = 0;
    let lastPlatformLenght = 0;

    for (let r = 0; r < rows; r++) {
      let rowHavePlatform;

      let startPoint;
      let platformLenght;

      let secondStartPoint;
      let secondPlatformLenght;

      if (
        r > 1 &&
        !rowsWithPlatforms[r - 1] &&
        !rowsWithPlatforms[r - 2] &&
        r !== characterPosition.y &&
        r !== finishPosition.y &&
        r < rows - 4
      ) {
        rowHavePlatform = Math.random() * 1 > 0.5 ? 1 : 0;
        rowsWithPlatforms[r] = rowHavePlatform;

        //console.log("rowsWithPlatforms: ", rowsWithPlatforms);
        //console.log("LAST INDEX OF :", lastRowHavePlatform);

        if (rowHavePlatform) {
          console.log(
            "LAST START POINT: " +
              lastRowHavePlatform +
              " - " +
              lastStartPoint +
              " - LENGHT: " +
              lastPlatformLenght
          );

          console.log("R: " + r);

          //PLATFORM
          platformLenght = Math.ceil(Math.random() * (8 - 2) + 2);

          const minStartPoint = lastStartPoint;
          const maxStartPoint = lastStartPoint + lastPlatformLenght;

          startPoint = Math.ceil(
            Math.random() * (maxStartPoint - minStartPoint) + minStartPoint
          );
          startPoint <= 0 && (startPoint = 1);

          if (startPoint + platformLenght <= columns / 2) {
            secondStartPoint = Math.ceil(
              Math.random() * (maxStartPoint - minStartPoint) + minStartPoint
            );

            secondStartPoint <= 0 && (secondStartPoint = 1);
          }

          //LADDER
          if (r - lastRowHavePlatform > 3) {
            for (
              let l =
                lastRowHavePlatform !== 0
                  ? lastRowHavePlatform + 1
                  : lastRowHavePlatform;
              l < r;
              l++
            ) {
              level[l][startPoint] = "l";

              console.log("Y: " + l + " - " + "X: " + startPoint);
            }
          }

          console.log("START POINT: " + r + " - " + startPoint);

          lastRowHavePlatform = r;
          lastStartPoint = startPoint;
          lastPlatformLenght = platformLenght;
        }
      } else if (r === finishPosition.y) {
        rowsWithPlatforms[r] = 1;
      } else {
        rowsWithPlatforms[r] = 0;
      }

      for (let c = 0; c < columns; c++) {
        //console.warn("C:", c);

        level[r][c] =
          r > 1 && r - 2 !== finishPosition.y && level[r - 2][c] === 1
            ? "c"
            : 0;

        /* if (r !== finishPosition.y && c !== finishPosition.x) {
          
        } */

        if (rowHavePlatform && startPoint && platformLenght) {
          // console.log("R:", r);

          // console.log("C: ", c);

          // console.log("START: ", startPoint);
          // console.log("PlatformLenght: ", platformLenght * 20);
          // console.log("END: ", startPoint + platformLenght);

          c >= startPoint &&
            c <= startPoint + platformLenght &&
            (level[r][c] = 1);
        }

        /* const randNum = Math.ceil(Math.random() * 5);

        switch (randNum) {
          case 1:
            level[r][c] = 1;
            break;

          case 2:
            level[r][c] = "c";
            break;

          case 3:
            level[r][c] = "s";
            break;

            case 4:
            level[r][c] = "e";
            break;
        }

        console.log(level[r][c] + "--" + randNum); */
      }
    }

    //level.reverse();

    //console.log(rowsWithPlatforms.reverse());

    level[finishPosition.y + 1][finishPosition.x] = "f";
    level[finishPosition.y][finishPosition.x] = "f";

    level[finishPosition.y - 1][finishPosition.x + 1] = 1;
    level[finishPosition.y - 1][finishPosition.x] = 1;
    level[finishPosition.y - 1][finishPosition.x - 1] = 1;

    y > 0 && (level[y - 1][x] = 1);

    setLevel([...level]);

    //console.log(level);
  };

  useEffect(() => {
    createLevel();
  }, []);

  return createLevel;
};
