import { SongDto } from "@/services/api/raidar/raidarSchemas";
import React, { useContext, useEffect, useState } from "react";

interface PlayerContextValue {
  song: SongDto | null;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  setSong: (song: SongDto | null) => void;
}

const PlayerContext = React.createContext<PlayerContextValue | null>(null);

export const PlayerContextProvider = ({ children }: any) => {
  const [song, setSong] = useState<SongDto | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (song) {
      setIsVisible(true);
    }
  }, [song]);

  return (
    <PlayerContext.Provider
      value={{
        song: song,
        setSong: (song) => {
          setSong(song);
        },
        isVisible: isVisible,
        setIsVisible: (isVisible) => {
          setIsVisible(isVisible);
        },
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export function userPlayerContext() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error(
      "userPlayerContext must be used within a PlayerContextProvider"
    );
  }

  return context;
}
