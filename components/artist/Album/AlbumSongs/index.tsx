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
  Paper,
  Loader,
} from "@mantine/core";
import { Plus } from "tabler-icons-react";

import Link from "next/link";
import { useRouter } from "next/router";
import formatDuration from "@/utils/formatDuration";
import { useAlbumControllerFindOne } from "@/services/api/raidar/raidarComponents";
import { SongDto } from "@/services/api/raidar/raidarSchemas";

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

  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
    textAlign: "center",
    marginBottom: "2%",
  },

  description: {
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },

  descriptionCard: {
    height: "300px",
    marginBottom: "2%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

const AlbumSongs = () => {
  const { classes } = useStyles();
  const router = useRouter();

  const albumId = router.query.id;

  const { data: album } = useAlbumControllerFindOne({
    pathParams: {
      id: albumId as string,
    },
  });

  const items = album?.songs.map((song: SongDto, i: number) => (
    <div className={classes.item} key={i}>
      <ThemeIcon
        variant="light"
        className={classes.itemIcon}
        size={130}
        radius="md"
      >
        <Image src={song.art.url} />
      </ThemeIcon>

      <div>
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          {song.title}
        </Text>
        <Text fw={700} fz="md" className={classes.itemTitle} c="dimmed">
          {song.genre}
        </Text>
        <Text fw={700} fz="md" className={classes.itemTitle} c="dimmed">
          {formatDuration(song.length)}
        </Text>
        <Anchor href={`/artist/song/${song.id}`} color="red" fw={700}>
          Check Song
        </Anchor>
      </div>
    </div>
  ));

  return (
    <Container size="100%" className={classes.wrapper}>
      <Paper
        radius="xl"
        className={classes.descriptionCard}
        sx={{ backgroundImage: `url(${album?.cover?.url})` }}
      />
      <Container size={800} className={classes.wrapper}>
        <Title className={classes.title} order={2} fw={700} fz={40}>
          {album?.title}
        </Title>

        <Button
          mx="auto"
          component={Link}
          href={`/artist/album/songs/create/${albumId}`}
          color="red"
          opacity={0.9}
        >
          <Plus size={20} /> Add Song
        </Button>

        <SimpleGrid
          cols={2}
          spacing={50}
          breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}
          style={{ marginTop: 30 }}
        >
          {items}
          {/* <Button
            sx={{ width: "100%", height: "100%" }}
            mx="auto"
            component={Link}
            href={`/artist/album/songs/create/${albumId}`}
            color="red"
            opacity={0.9}
          >
            <Plus size={20} /> Add Song
          </Button> */}
        </SimpleGrid>
      </Container>
    </Container>
  );
};

export default AlbumSongs;
