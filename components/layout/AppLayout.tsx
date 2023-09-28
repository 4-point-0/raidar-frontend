import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { AppShell, Box, Transition } from "@mantine/core";

import { ArtistHeader } from "@/components/artist/ArtistHeader";
import { useFindUser } from "../../hooks/useFindUser";
import { UserHeader } from "@/components/user/UserHeader";
import { MusicPlayer } from "../MusicPlayer";
import { userPlayerContext } from "@/context/PlayerContext";
import { useSession } from "next-auth/react";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const { user } = useFindUser();

  const { song, isVisible } = userPlayerContext();
  const session = useSession();

  const isRoot = router.route === "/login";
  const isArtist = user?.roles.includes("artist");

  const renderHeader = () => {
    if (isArtist) {
      return <ArtistHeader />;
    } else {
      return <UserHeader />;
    }
  };

  useEffect(() => {
    if (session.status !== "authenticated") {
      router.push("/login");
    }
  }, []);

  return (
    <AppShell
      sx={{
        position: "relative",
        paddingBottom: song ? 100 : 0,
      }}
      padding="sm"
      header={!isRoot ? renderHeader() : undefined}
      navbarOffsetBreakpoint="sm"
    >
      {children}

      <Transition
        mounted={isVisible}
        transition="slide-up"
        duration={200}
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <Box
            style={{
              ...styles,
            }}
            sx={{
              boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.1)",
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
      </Transition>
    </AppShell>
  );
};
