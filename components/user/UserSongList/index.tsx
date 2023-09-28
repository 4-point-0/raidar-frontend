import {
  Anchor,
  Box,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from "@mantine/core";

import ImageWithBlurredShadow from "@/components/ImageBlurShadow";
import {
  useAlbumControllerFindAllArtistAlbums,
  useSongControllerFindAllUserSongs,
} from "@/services/api/raidar/raidarComponents";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
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
}));

const UserSongList = () => {
  const { classes } = useStyles();
  const { data: albums } = useAlbumControllerFindAllArtistAlbums({});
  const theme = useMantineTheme();
  const router = useRouter();

  const { data, isLoading, error } = useSongControllerFindAllUserSongs({});

  const items = (data?.results ?? []).map((song: any, i: number) => (
    <Group
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
        src={song.art.url}
        alt={song.title}
        height={140}
        width={140}
        blur={16}
        shadowOffset={-16}
      />

      <Box ml="md">
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          {song.title}
        </Text>

        <Text fw={400} fz="lg" className={classes.itemTitle} c="dimmed">
          {song.pka}
        </Text>

        <Anchor href={`/user/songs/${song.id}`} color="red" fw={700}>
          Check Song
        </Anchor>
      </Box>
    </Group>
  ));

  return (
    <Container>
      <Title order={2} className={classes.title} ta="center" mt="sm">
        My Songs
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        You have {data?.results ? data?.results.length : 0} song licenses
      </Text>

      {isLoading && (
        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Loading...
        </Text>
      )}

      <SimpleGrid
        mt="xl"
        cols={2}
        spacing="lg"
        breakpoints={[
          { maxWidth: theme.breakpoints.sm, cols: 1, spacing: "md" },
          { maxWidth: theme.breakpoints.md, cols: 2, spacing: "md" },
        ]}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
};

export default UserSongList;
