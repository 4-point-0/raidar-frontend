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
} from "@mantine/core";
import { Disc, Music, ClockPlay, Plus } from "tabler-icons-react";

import Link from "next/link";
import { useAlbumControllerFindAll } from "@/services/api/artist/artistComponents";

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
      backgroundColor: theme.fn.primaryColor(),
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

  const items = albums?.results.map((album: any, i: any) => (
    <div className={classes.item} key={i}>
      <ThemeIcon
        variant="light"
        className={classes.itemIcon}
        size={140}
        radius="md"
      >
        <Image src={album.cover.url} />
      </ThemeIcon>

      <div>
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          {album.title}
        </Text>

        <Text fw={400} fz="lg" className={classes.itemTitle} c="dimmed">
          {album.pka}
        </Text>

        <Anchor href={`/artist/album/${album.id}`} color="red" fw={700}>
          Songs
        </Anchor>
      </div>
    </div>
  ));

  return (
    <Container size={1000} className={classes.wrapper}>
      {/* <Title className={classes.title} order={2} mb={50}>
        My Albums
      </Title> */}
      {/* <Card withBorder radius="xl" p="xl" className={classes.descriptionCard}>
        <Group>
          <Paper className={classes.paper} shadow="md">
            <Disc size={30} color="white" />
            <Text
              fz="lg"
              tt="uppercase"
              fw={700}
              className={classes.descriptionStats}
            >
              Albums
            </Text>
            <Text fz="lg" fw={500} className={classes.descriptionStats}>
              {albums?.results ? albums?.results.length : 0}
            </Text>
          </Paper>
          <Paper className={classes.paper} shadow="md">
            <Music size={30} color="white" />
            <Text
              fz="lg"
              tt="uppercase"
              fw={700}
              className={classes.descriptionStats}
            >
              Songs
            </Text>
            <Text fz="lg" fw={500} className={classes.descriptionStats}>
              20
            </Text>
          </Paper>
          <Paper className={classes.paper} shadow="md">
            <ClockPlay size={30} color="white" />
            <Text
              fz="lg"
              tt="uppercase"
              fw={700}
              className={classes.descriptionStats}
            >
              MINUTES
            </Text>
            <Text fz="lg" fw={500} className={classes.descriptionStats}>
              120
            </Text>
          </Paper>
        </Group>
      </Card> */}

      <Title order={2} className={classes.title} ta="center" mt="sm">
        My Albums
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        You have {albums?.results ? albums?.results.length : 0} published albums
      </Text>

      <Button
        component={Link}
        href="/artist/album/create"
        color="red"
        mt={50}
        leftIcon={<Plus size={20} />}
      >
        New Album
      </Button>

      <SimpleGrid
        cols={3}
        spacing={60}
        breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}
        style={{ marginTop: 30 }}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
};

export default ArtistAlbums;
