import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { AppShell } from "@mantine/core";

import { ArtistHeader } from "@/components/artist/ArtistHeader";
import { useFindUser } from "../../hooks/useFindUser";
// import { ArtistNavbar } from "@/components/artist/ArtistNavbar";
// import { UserHeader } from "@/components/user/UserHeader";
// import { UserFooter } from "@/components/user/UserFooter";

export const AppLayout = ({ children }: PropsWithChildren) => {
  // const router = useRouter();

  const { user } = useFindUser();

  // const isRoot = router.route === "/";
  // const isArtist = router.route.startsWith("/artist");
  // const isUser = router.route.startsWith("/user");

  const isArtist = user?.roles.includes("artist");
  const isUser = user?.roles.includes("user");

  const appShell = () => (
    // <AppShell
    //   padding="md"
    //   navbar={isArtist ? <ArtistNavbar opened={opened} /> : undefined}
    //   header={
    //     isArtist ? (
    //       <ArtistHeader opened={opened}>
    //         <MediaQuery largerThan="sm" styles={{ display: "none" }}>
    //           <Burger
    //             opened={opened}
    //             onClick={() => setOpened((o) => !o)}
    //             size="sm"
    //             color="#000"
    //             mr="xl"
    //           />
    //         </MediaQuery>
    //       </ArtistHeader>
    //     ) : (
    //       <UserHeader />
    //     )
    //   }
    //   footer={
    //     <UserFooter
    //       data={[
    //         {
    //           title: "Company",
    //           links: [
    //             { label: "About", link: "https://tekuno.app/about-us/" },
    //             { label: "Blog", link: "https://medium.com/@tekuno" },
    //           ],
    //         },
    //         {
    //           title: "Support",
    //           links: [
    //             {
    //               label: "Terms of Service",
    //               link: "https://tekuno.app/terms-of-use/",
    //             },
    //             {
    //               label: "Privacy Policy",
    //               link: "https://tekuno.app/privacy-policy/",
    //             },
    //           ],
    //         },
    //         {
    //           title: "Connect",
    //           links: [{ label: "Contact", link: "https://medium.com/@tekuno" }],
    //         },
    //       ]}
    //     />
    //   }
    //   navbarOffsetBreakpoint="sm"
    //   styles={(theme) => ({})}
    // >
    //   {children}
    // </AppShell>

    <AppShell
      padding="sm"
      header={isArtist ? <ArtistHeader /> : undefined}
      navbarOffsetBreakpoint="sm"
    >
      {children}
    </AppShell>
  );

  return appShell();
};
