import { AccountDetails } from "@/components/AccountDetails";
import ThemeTogglerButton from "@/components/ThemeTogglerButton";
import {
  createStyles,
  Header,
  Group,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";

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

  return (
    <Box pb={40}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <a href="/marketplace">
            <Image src="/images/berklee-college.png" width={150} />
          </a>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <a
              href="/marketplace"
              className={`${
                pathname === "/marketplace" ? classes.activeLink : classes.link
              }`}
            >
              Marketplace
            </a>
            <a
              href="/artist/albums"
              className={`${
                pathname === "/artist/albums"
                  ? classes.activeLink
                  : classes.link
              }`}
            >
              My Albums
            </a>
          </Group>

          <Group className={classes.hiddenMobile}>
            <AccountDetails />

            <ThemeTogglerButton />
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
          <a href="/marketplace">
            <Image src="/images/berklee-college.png" width={150} />
          </a>
        }
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <a
            href="/marketplace"
            className={`${
              pathname === "/marketplace" ? classes.activeLink : classes.link
            }`}
          >
            Marketplace
          </a>
          <a
            href="/artist/albums"
            className={`${
              pathname === "/artist/albums" ? classes.activeLink : classes.link
            }`}
          >
            My Albums
          </a>
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <AccountDetails />

            <ThemeTogglerButton />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
