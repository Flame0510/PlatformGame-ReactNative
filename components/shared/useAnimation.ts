import { useEffect } from "react";
import { Level } from "../../models/Level";

export const useAnimation = ({
  level,
  coinPosition,
  setCoinPosition,
}: {
  level: Level;
  coinPosition: number;
  setCoinPosition: (coinPosition: number) => void;
}) => {
  const animate = () => {
    const animationInterval = setInterval(() => {
      //COINS ANIMATION
      let coinDirection = "up";

      coinPosition === 0
        ? setCoinPosition(5)
        : coinPosition === 5 && setCoinPosition(0);

      //setCoinPosition(coinDirection === "up" ? coinPosition++ : coinPosition--);
    }, 500);
  };

  useEffect(() => {
    animate();
  }, []);
};
