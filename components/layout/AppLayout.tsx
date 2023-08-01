import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { AppShell, Box } from "@mantine/core";

import { ArtistHeader } from "@/components/artist/ArtistHeader";
import { useFindUser } from "../../hooks/useFindUser";
import { UserHeader } from "@/components/user/UserHeader";
import { MusicPlayer } from "../MusicPlayer";
import { userPlayerContext } from "@/context/PlayerContext";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const { user } = useFindUser();

  const { song } = userPlayerContext();

  const isRoot = router.route === "/login";
  const isArtist = user?.roles.includes("artist");
  const isUser = user?.roles.includes("user");

  const renderHeader = () => {
    if (isArtist) {
      return <ArtistHeader />;
    } else {
      return <UserHeader />;
    }
  };

  return (
    <AppShell
      sx={{
        position: "relative",
      }}
      padding="sm"
      header={!isRoot ? renderHeader() : undefined}
      navbarOffsetBreakpoint="sm"
    >
      {children}

      {song && (
        <Box
          sx={{
            borderTop: "1px solid #ccc",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <MusicPlayer />
        </Box>
      )}
    </AppShell>
  );
};
