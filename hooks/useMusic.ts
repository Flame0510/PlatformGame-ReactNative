import { Audio } from "expo-av";
import { useEffect, useState } from "react";

export const useMusic = () => {
  const [sound, setSound] = useState<any>();
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/music.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.setIsLoopingAsync(true);
    await sound.playAsync();
    setIsMuted(true);
  };

  const resumeSound = async () => {
    await sound.setIsMutedAsync(false);
    setIsMuted(true);
  };

  const stopSound = async () => {
    await sound.setIsMutedAsync(true);
    setIsMuted(false);
  };

  const switchMute = () => (isMuted ? stopSound : resumeSound);

  useEffect(() => {
    isMuted && playSound();
  }, []);

  return { isMuted, playSound, resumeSound, stopSound, switchMute };
};
