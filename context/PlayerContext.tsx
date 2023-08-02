import { SongDto } from "@/services/api/raidar/raidarSchemas";
import React, { useContext, useEffect, useState } from "react";

interface PlayerContextValue {
  song: SongDto | null;
  setSong: (song: SongDto | null) => void;
}

const PlayerContext = React.createContext<PlayerContextValue | null>(null);

export const PlayerContextProvider = ({ children }: any) => {
  const [song, setSong] = useState<SongDto | null>(null);

  return (
    <PlayerContext.Provider
      value={{
        song: song,
        setSong: (song) => {
          setSong(song);
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
