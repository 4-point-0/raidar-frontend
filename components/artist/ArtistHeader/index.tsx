import { AccountDetails } from "@/components/AccountDetails";
import ThemeTogglerButton from "@/components/ThemeTogglerButton";
import {
  Anchor,
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  Header,
  Image,
  ScrollArea,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  activeLink: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colors.red[5],
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  button: {
    backgroundColor: theme.colors.red[5],
    ...theme.fn.hover({
      backgroundColor: theme.colors.red[8],
    }),
  },
}));

export const ArtistHeader = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { classes, theme } = useStyles();
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    router.events.on("routeChangeComplete", closeDrawer);

    return () => {
      router.events.off("routeChangeComplete", closeDrawer);
    };
  }, []);

  return (
    <Box pb={40}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Link href="/marketplace" style={{ width: "30%" }}>
            <Image src={"/images/raidar-logo.png"} width={120} />
          </Link>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link
              href="/marketplace"
              className={`${
                pathname === "/marketplace" ? classes.activeLink : classes.link
              }`}
            >
              Marketplace
            </Link>
            <Link
              href="/artist/albums"
              className={`${
                pathname === "/artist/albums"
                  ? classes.activeLink
                  : classes.link
              }`}
            >
              My Playlists
            </Link>
            <Link
              href="/documentation"
              className={`${
                pathname === "/documentation"
                  ? classes.activeLink
                  : classes.link
              }`}
            >
              Documentation
            </Link>
            <Link
              href="/contracts"
              className={`${
                pathname === "/contracts" ? classes.activeLink : classes.link
              }`}
            >
              Contracts
            </Link>
          </Group>

          <Group
            className={classes.hiddenMobile}
            sx={{
              width: "30%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <AccountDetails />
            <ThemeTogglerButton />
            <Anchor<"a"> c="dimmed" href={"https://near.org/"}>
              <Image
                src={
                  theme.colorScheme === "light"
                    ? "/images/built-on-near-black.svg"
                    : "/images/built-on-near-white.svg"
                }
                width={120}
              />
            </Anchor>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <Link href="/marketplace">
            <Image src={"/images/raidar-logo.png"} width={120} />
          </Link>
        }
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <Link
            href="/marketplace"
            className={`${
              pathname === "/marketplace" ? classes.activeLink : classes.link
            }`}
          >
            Marketplace
          </Link>
          <Link
            href="/artist/albums"
            className={`${
              pathname === "/artist/albums" ? classes.activeLink : classes.link
            }`}
          >
            My Playlists
          </Link>
          <Link
            href="/documentation"
            className={`${
              pathname === "/documentation" ? classes.activeLink : classes.link
            }`}
          >
            Documentation
          </Link>
          <Link
            href="/contracts"
            className={`${
              pathname === "/contracts" ? classes.activeLink : classes.link
            }`}
          >
            Contracts
          </Link>
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <AccountDetails />
            <ThemeTogglerButton />
            <Anchor<"a"> c="dimmed" href={"https://near.org/"}>
              <Image
                src={
                  theme.colorScheme === "light"
                    ? "/images/built-on-near-black.svg"
                    : "/images/built-on-near-white.svg"
                }
                width={120}
              />
            </Anchor>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
