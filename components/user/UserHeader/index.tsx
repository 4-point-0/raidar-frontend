import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Image,
  Popover,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Logout, Wallet } from "tabler-icons-react";
import ThemeTogglerButton from "@/components/ThemeTogglerButton";
import { AccountDetails } from "@/components/AccountDetails";

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

export const UserHeader = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const router = useRouter();
  const pathname = router.pathname;

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Box pb={40}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Image src="/images/berklee-college.png" width={150} />
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
              href="/user/songs"
              className={`${
                pathname === "/user/albums" ? classes.activeLink : classes.link
              }`}
            >
              My Songs
            </a>
            <a
              href="/user/profile"
              className={`${
                pathname === "/user/profile" ? classes.activeLink : classes.link
              }`}
            >
              Profile
            </a>
          </Group>

          <Group className={classes.hiddenMobile}>
            <AccountDetails />
            <ThemeTogglerButton />
            {/* <Popover width="auto" position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button className={classes.button} leftIcon={<Wallet />}>
                  Wallet
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <AccountDetails />
              </Popover.Dropdown>
            </Popover>
            <Button
              color="red"
              leftIcon={<Logout size={14} />}
              onClick={handleLogout}
            >
              Log Out
            </Button> */}
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
        title="Navigation"
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
            href="/user/songs"
            className={`${
              pathname === "/user/songs" ? classes.activeLink : classes.link
            }`}
          >
            My Songs
          </a>
          <a
            href="/user/profile"
            className={`${
              pathname === "/user/profile" ? classes.activeLink : classes.link
            }`}
          >
            My Profile
          </a>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <AccountDetails />
            <ThemeTogglerButton />
            {/* <Popover width="auto" position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button className={classes.button} leftIcon={<Wallet />}>
                  Wallet
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <AccountDetails />
              </Popover.Dropdown>
            </Popover>
            <Button
              leftIcon={<Logout size={14} />}
              color="red"
              onClick={handleLogout}
            >
              Log Out
            </Button> */}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
