import { useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
  Title,
  Button,
} from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons-react";
import { ArrowBarRight, ArrowBarLeft } from "tabler-icons-react";
import { MantineLogo } from "@mantine/ds";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: "white",
  },

  button: {
    backgroundColor: "#fa5252",
    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: "dark" }).background!,
        0.1
      ),
    },
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: "red" }).background!,
      0.1
    )}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: "dark",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.15
      ),
      [`& .${getStylesRef("icon")}`]: {
        opacity: 0.9,
      },
    },
  },
  title: {
    color: "dark",
  },
}));

const data = [
  { link: "", label: "Genre", icon: IconBellRinging },
  { link: "", label: "Artist", icon: IconReceipt2 },
  { link: "", label: "Min. length", icon: IconFingerprint },
  { link: "", label: "Max. Length", icon: IconKey },
  { link: "", label: "Genre", icon: IconDatabaseImport },
  { link: "", label: "Mood", icon: Icon2fa },
  { link: "", label: "Min. Bpm", icon: IconSettings },
  { link: "", label: "Max. Bpm", icon: IconSettings },
  { link: "", label: "Instrumental", icon: IconSettings },
  { link: "", label: "Musical key", icon: IconSettings },
];

export const MarketplaceFilters = () => {
  const [navbarOpen, setNavbarOpen] = useState(false); // Add a new state variable for the Navbar open/close state

  const handleNavbarToggle = () => {
    setNavbarOpen(!navbarOpen); // Toggle the Navbar open/close state when the button is clicked
  };

  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      height="100%"
      width={{ sm: navbarOpen ? 300 : 100 }} // Set the width based on whether the Navbar is open or closed
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Title order={4} className={classes.title}>
            Filters
          </Title>
          <Button className={classes.button} onClick={handleNavbarToggle}>
            {/* Display different icons based on whether the Navbar is open or closed */}
            {navbarOpen
              ? //   <ArrowBarLeft color="white" />
                "Close"
              : //   <ArrowBarRight color="white" />
                "Open"}
          </Button>
        </Group>
        {navbarOpen && links} {/* Render links only when the Navbar is open */}
      </Navbar.Section>
    </Navbar>
  );
};

export default MarketplaceFilters;
