import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { AppShell } from "@mantine/core";

import { ArtistHeader } from "@/components/artist/ArtistHeader";
import { useFindUser } from "../../hooks/useFindUser";
import { UserHeader } from "@/components/user/UserHeader";

export const AppLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const { user } = useFindUser();

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
      padding="sm"
      header={!isRoot ? renderHeader() : undefined}
      navbarOffsetBreakpoint="sm"
    >
      {children}
    </AppShell>
  );
};
