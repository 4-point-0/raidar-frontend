import {
  Image,
  Text,
  Container,
  ThemeIcon,
  Title,
  SimpleGrid,
  createStyles,
  rem,
  Button,
  Anchor,
  Card,
  Group,
  Paper,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { Disc, Music, ClockPlay, Plus } from "tabler-icons-react";

import Link from "next/link";
import { useAlbumControllerFindAll } from "@/services/api/raidar/raidarComponents";
import ImageWithBlurredShadow from "@/components/ImageBlurShadow";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: rem(0),
    paddingBottom: rem(50),
  },

  item: {
    display: "flex",
  },

  itemIcon: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },

  itemTitle: {
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
  },

  supTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: 800,
    fontSize: theme.fontSizes.sm,
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      .color,
    letterSpacing: rem(0.5),
  },

  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  descriptionCard: {
    height: "100%",
    marginBottom: "5%",
    backgroundImage: "url('/images/studio-profile.jpeg')",
    backgroundSize: "cover",
  },

  descriptionStats: {
    color: "white",
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.colors.red[5],
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  paper: {
    margin: "auto",
    backgroundColor: "#fa5252",
    padding: "2%",
    textAlign: "center",
    width: "20%",
    borderRadius: "15px",
    opacity: "0.9",
  },

  highlight: {
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    padding: rem(5),
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: "inline-block",
    color: theme.colorScheme === "dark" ? theme.white : "inherit",
  },
}));

const ArtistAlbums = () => {
  const { classes } = useStyles();
  const { data: albums } = useAlbumControllerFindAll({});
  const theme = useMantineTheme();
  const router = useRouter();

  const addNewAlbumItem = () => {
    return (
      <Group
        onClick={() => {
          router.push("/artist/album/create");
        }}
        mb="lg"
        p="lg"
        sx={(theme) => ({
          ":hover": {
            cursor: "pointer",
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[2],
            borderRadius: theme.radius.md,
            transition: "all 0.2s ease-in-out",
          },
        })}
      >
        <Box sx={{ position: "relative" }}>
          <ImageWithBlurredShadow
            src={
              "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzaWMlMjByZWNvcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            }
            alt={"Add new album"}
            height={140}
            width={140}
            blur={16}
            shadowOffset={-16}
          />
          <Box
            sx={(theme) => ({
              position: "absolute",
              zIndex: 9999,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.fn.rgba(theme.colors.dark[6], 0.8)
                  : theme.fn.rgba(theme.colors.gray[2], 0.8),
              height: 140,
              width: 140,
              borderRadius: theme.radius.md,
            })}
          >
            <Plus size={60} />
          </Box>
        </Box>

        <Box ml="md">
          <Text fw={700} fz="lg" className={classes.itemTitle}>
            Add new Album
          </Text>
        </Box>
      </Group>
    );
  };

  const items = albums?.results.map((album: any, i: any) => (
    <Group
      // className={classes.item}
      key={i}
      mb="lg"
      p="lg"
      sx={(theme) => ({
        ":hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[2],
          borderRadius: theme.radius.md,
          transition: "all 0.2s ease-in-out",
        },
      })}
    >
      <ImageWithBlurredShadow
        src={album.cover.url}
        alt={album.title}
        height={140}
        width={140}
        blur={16}
        shadowOffset={-16}
      />

      <Box ml="md">
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          {album.title}
        </Text>

        <Text fw={400} fz="lg" className={classes.itemTitle} c="dimmed">
          {album.pka}
        </Text>

        <Anchor href={`/artist/album/${album.id}`} color="red" fw={700}>
          View Songs
        </Anchor>
      </Box>
    </Group>
  ));

  return (
    <Container>
      <Title order={2} className={classes.title} ta="center" mt="sm">
        My Albums
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        You have {albums?.results ? albums?.results.length : 0} published albums
      </Text>

      <SimpleGrid
        mt="xl"
        cols={2}
        spacing="lg"
        breakpoints={[
          { maxWidth: theme.breakpoints.sm, cols: 1, spacing: "md" },
          { maxWidth: theme.breakpoints.md, cols: 2, spacing: "md" },
        ]}
      >
        {addNewAlbumItem()}
        {items}
      </SimpleGrid>
    </Container>
  );
};

export default ArtistAlbums;
