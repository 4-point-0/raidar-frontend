import {
  Text,
  Container,
  Title,
  SimpleGrid,
  createStyles,
  rem,
  Anchor,
  Group,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { Plus } from "tabler-icons-react";

import { useAlbumControllerFindAllArtistAlbums } from "@/services/api/raidar/raidarComponents";
import ImageWithBlurredShadow from "@/components/ImageBlurShadow";
import { useRouter } from "next/router";
import { AlbumDto, SongDto } from "@/services/api/raidar/raidarSchemas";

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

const results = {
  total: 4,
  take: 10,
  skip: 0,
  count: 4,
  results: [
    {
      id: "0a4b14ad-3c7f-4a1e-9fc3-8e619d765d79",
      user_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      title: "Shadows on the Canvas",
      length: 200,
      genre: "A Cappella",
      mood: ["Happy"],
      tags: ["HardBeat"],
      bpm: 138,
      instrumental: true,
      languages: ["English"],
      vocal_ranges: ["tenor"],
      musical_key: "F# Major",
      recording_date: "2023-08-02T22:00:00.000Z",
      recording_location: "Los Angeles",
      recording_country: "United States",
      pka: "SlavRa",
      last_listing: {
        id: "338849c0-b8f0-498c-8395-e805a10ff0ea",
        seller: {
          id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
          email: "dominik.bosnjak94@gmail.com",
          first_name: "Dominik",
          last_name: "Bošnjak",
          roles: ["artist"],
          provider: "google",
          provider_id: "112385724412693421820",
          wallet_address: null,
          created_at: "2023-08-09T12:33:47.980Z",
          updated_at: "2023-08-09T12:33:47.980Z",
        },
        buyer: null,
        tx_hash: null,
        price: "22.44",
        created_at: "2023-08-09T12:59:07.079Z",
        updated_at: "2023-08-09T12:59:07.079Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
      music: {
        id: "695945dd-67e0-4a25-9061-501d48a9db8b",
        name: "music-1 (1).wav",
        url: "https://raidar-files.s3.eu-central-1.amazonaws.com/030fe660-2d23-4084-bca0-61e67fbdc0ec",
        key: "030fe660-2d23-4084-bca0-61e67fbdc0ec",
        mime_type: "audio/wav",
        url_expiry: "2024-08-09T12:57:30.625Z",
        created_at: "2023-08-09T12:57:30.626Z",
        updated_at: "2023-08-09T12:57:30.626Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
      art: {
        id: "121d5751-323d-4c2e-a045-c9da62ba35c7",
        name: "11.jpg",
        url: "https://raidar-files.s3.eu-central-1.amazonaws.com/da64221f-aaa7-413f-bd1e-188cd749f612",
        key: "da64221f-aaa7-413f-bd1e-188cd749f612",
        mime_type: "image/jpeg",
        url_expiry: null,
        created_at: "2023-08-09T12:57:20.269Z",
        updated_at: "2023-08-09T12:57:20.269Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
      album: {
        id: "07ed0ba9-3962-474e-ae86-4b8fbc199602",
        title: "Silhouette of Yesterday",
        pka: "Dompadre",
        cover: {
          id: "cd23f7f8-dd77-4ec0-9211-11a29926b432",
          name: "9.png",
          url: "https://raidar-files.s3.eu-central-1.amazonaws.com/1136be1d-57a9-4b0e-b2ab-0de7262a75bc",
          key: "1136be1d-57a9-4b0e-b2ab-0de7262a75bc",
          mime_type: "image/png",
          url_expiry: null,
          created_at: "2023-08-09T12:48:35.724Z",
          updated_at: "2023-08-09T12:48:35.724Z",
          created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
          updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        },
        created_at: "2023-08-09T12:48:51.075Z",
        updated_at: "2023-08-09T12:48:51.075Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
    },
    {
      id: "6d7539ce-4bc2-4822-8b0d-31a8bebc6d7b",
      user_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      title: "Midnight Carousel",
      length: 330,
      genre: "Trap Music",
      mood: ["Epic, Happy"],
      tags: ["#bassboosted, #happy"],
      bpm: 173,
      instrumental: true,
      languages: ["English"],
      vocal_ranges: ["Not Defined"],
      musical_key: "C Major",
      recording_date: "2023-07-30T22:00:00.000Z",
      recording_location: "Zagreb",
      recording_country: "Croatia",
      pka: "Dompadre",
      last_listing: {
        id: "17b7a503-d61c-4bfa-88a3-dd4dca9d8a60",
        seller: {
          id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
          email: "dominik.bosnjak94@gmail.com",
          first_name: "Dominik",
          last_name: "Bošnjak",
          roles: ["artist"],
          provider: "google",
          provider_id: "112385724412693421820",
          wallet_address: null,
          created_at: "2023-08-09T12:33:47.980Z",
          updated_at: "2023-08-09T12:33:47.980Z",
        },
        buyer: null,
        tx_hash: null,
        price: "33.57",
        created_at: "2023-08-09T13:03:03.335Z",
        updated_at: "2023-08-09T13:03:03.335Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
      music: {
        id: "1f766695-0cb4-4d4f-ab02-d420d1f10f5c",
        name: "music-1 (1).wav",
        url: "https://raidar-files.s3.eu-central-1.amazonaws.com/ffa5ae92-ba1b-478b-b57e-19a5810aa2df",
        key: "ffa5ae92-ba1b-478b-b57e-19a5810aa2df",
        mime_type: "audio/wav",
        url_expiry: "2024-08-09T13:00:56.841Z",
        created_at: "2023-08-09T13:00:56.842Z",
        updated_at: "2023-08-09T13:00:56.842Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
      art: {
        id: "c2e10462-1a59-4efc-a924-1cf06ad1910a",
        name: "22.jpg",
        url: "https://raidar-files.s3.eu-central-1.amazonaws.com/a9b7d2b2-6b88-4deb-bda1-fcc0d27538b1",
        key: "a9b7d2b2-6b88-4deb-bda1-fcc0d27538b1",
        mime_type: "image/jpeg",
        url_expiry: null,
        created_at: "2023-08-09T13:00:46.366Z",
        updated_at: "2023-08-09T13:00:46.366Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
      album: {
        id: "07ed0ba9-3962-474e-ae86-4b8fbc199602",
        title: "Silhouette of Yesterday",
        pka: "Dompadre",
        cover: {
          id: "cd23f7f8-dd77-4ec0-9211-11a29926b432",
          name: "9.png",
          url: "https://raidar-files.s3.eu-central-1.amazonaws.com/1136be1d-57a9-4b0e-b2ab-0de7262a75bc",
          key: "1136be1d-57a9-4b0e-b2ab-0de7262a75bc",
          mime_type: "image/png",
          url_expiry: null,
          created_at: "2023-08-09T12:48:35.724Z",
          updated_at: "2023-08-09T12:48:35.724Z",
          created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
          updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        },
        created_at: "2023-08-09T12:48:51.075Z",
        updated_at: "2023-08-09T12:48:51.075Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
    },
    {
      id: "7184c188-760e-4a10-9af3-674ae7031e91",
      user_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      title: "Daydream Symphony",
      length: 180,
      genre: "Electro Dub",
      mood: ["Happy, Longterm, Blessed"],
      tags: ["#london, #paris, #dublin"],
      bpm: 155,
      instrumental: true,
      languages: ["French"],
      vocal_ranges: ["bass"],
      musical_key: "Not Defined",
      recording_date: "2023-06-29T22:00:00.000Z",
      recording_location: "Dublin",
      recording_country: "Canada",
      pka: "Ivory",
      last_listing: {
        id: "1abf262a-e009-4327-b33f-322162797533",
        seller: {
          id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
          email: "dominik.bosnjak94@gmail.com",
          first_name: "Dominik",
          last_name: "Bošnjak",
          roles: ["artist"],
          provider: "google",
          provider_id: "112385724412693421820",
          wallet_address: null,
          created_at: "2023-08-09T12:33:47.980Z",
          updated_at: "2023-08-09T12:33:47.980Z",
        },
        buyer: null,
        tx_hash: null,
        price: "33.44",
        created_at: "2023-08-09T13:06:56.328Z",
        updated_at: "2023-08-09T13:06:56.328Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
      music: {
        id: "4ff0981c-30c6-46a6-983c-ca4969197696",
        name: "music-1 (1).wav",
        url: "https://raidar-files.s3.eu-central-1.amazonaws.com/849fbf94-3bd4-415c-afac-939671d88677",
        key: "849fbf94-3bd4-415c-afac-939671d88677",
        mime_type: "audio/wav",
        url_expiry: "2024-08-09T13:03:56.663Z",
        created_at: "2023-08-09T13:03:56.664Z",
        updated_at: "2023-08-09T13:03:56.664Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
      art: {
        id: "73c7db3a-709b-49c7-a3f4-4c0b48e09b5e",
        name: "33.jpg",
        url: "https://raidar-files.s3.eu-central-1.amazonaws.com/27617006-ca57-4832-8de9-c24e299835de",
        key: "27617006-ca57-4832-8de9-c24e299835de",
        mime_type: "image/jpeg",
        url_expiry: null,
        created_at: "2023-08-09T13:03:46.671Z",
        updated_at: "2023-08-09T13:03:46.671Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
      album: {
        id: "561a6a8c-4ee8-4e90-bc92-020bc43d4b26",
        title: "Moonlight Whispers",
        pka: "Dompadre",
        cover: {
          id: "a9e77c6f-ea07-462a-bd12-c896c656e1e2",
          name: "10.png",
          url: "https://raidar-files.s3.eu-central-1.amazonaws.com/65aeb3fb-7847-4d28-b34f-9cd60e51e55e",
          key: "65aeb3fb-7847-4d28-b34f-9cd60e51e55e",
          mime_type: "image/png",
          url_expiry: null,
          created_at: "2023-08-09T12:49:00.570Z",
          updated_at: "2023-08-09T12:49:00.570Z",
          created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
          updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        },
        created_at: "2023-08-09T12:49:15.613Z",
        updated_at: "2023-08-09T12:49:15.613Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
    },
    {
      id: "16a537e9-add4-459e-8d18-72684bc92c44",
      user_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      title: "Daydream Symphony",
      length: 240,
      genre: "Electric Blues",
      mood: ["Euphoric"],
      tags: ["#play, #smart, #drink"],
      bpm: 130,
      instrumental: true,
      languages: ["Croatian"],
      vocal_ranges: ["mezzo-soprano"],
      musical_key: "D# Minor",
      recording_date: "2023-05-04T22:00:00.000Z",
      recording_location: "New York",
      recording_country: "Ireland",
      pka: "Ivory",
      last_listing: {
        id: "988eafb3-502f-4bb2-9aff-2d7ef408eefc",
        seller: {
          id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
          email: "dominik.bosnjak94@gmail.com",
          first_name: "Dominik",
          last_name: "Bošnjak",
          roles: ["artist"],
          provider: "google",
          provider_id: "112385724412693421820",
          wallet_address: null,
          created_at: "2023-08-09T12:33:47.980Z",
          updated_at: "2023-08-09T12:33:47.980Z",
        },
        buyer: null,
        tx_hash: null,
        price: "0.00",
        created_at: "2023-08-09T13:10:05.227Z",
        updated_at: "2023-08-09T13:10:05.227Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
      music: {
        id: "5790037f-9074-45fc-9dc9-c754871df981",
        name: "music-1 (1).wav",
        url: "https://raidar-files.s3.eu-central-1.amazonaws.com/33c21d49-9984-447e-9cc7-fb7dd921d82c",
        key: "33c21d49-9984-447e-9cc7-fb7dd921d82c",
        mime_type: "audio/wav",
        url_expiry: "2024-08-09T13:08:33.812Z",
        created_at: "2023-08-09T13:08:33.813Z",
        updated_at: "2023-08-09T13:08:33.813Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
      art: {
        id: "97149c0a-59f0-44a8-8932-5dcd6f16c40d",
        name: "44.jpg",
        url: "https://raidar-files.s3.eu-central-1.amazonaws.com/a82638ff-5fc9-4ff5-aa4b-e78928bf7eec",
        key: "a82638ff-5fc9-4ff5-aa4b-e78928bf7eec",
        mime_type: "image/jpeg",
        url_expiry: null,
        created_at: "2023-08-09T13:08:20.883Z",
        updated_at: "2023-08-09T13:08:20.883Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
      album: {
        id: "561a6a8c-4ee8-4e90-bc92-020bc43d4b26",
        title: "Moonlight Whispers",
        pka: "Dompadre",
        cover: {
          id: "a9e77c6f-ea07-462a-bd12-c896c656e1e2",
          name: "10.png",
          url: "https://raidar-files.s3.eu-central-1.amazonaws.com/65aeb3fb-7847-4d28-b34f-9cd60e51e55e",
          key: "65aeb3fb-7847-4d28-b34f-9cd60e51e55e",
          mime_type: "image/png",
          url_expiry: null,
          created_at: "2023-08-09T12:49:00.570Z",
          updated_at: "2023-08-09T12:49:00.570Z",
          created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
          updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        },
        created_at: "2023-08-09T12:49:15.613Z",
        updated_at: "2023-08-09T12:49:15.613Z",
        created_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
        updated_by_id: "327f7b5f-3075-43ce-a3db-53f3a9b6b3d6",
      },
    },
  ],
};

const UserSongList = () => {
  const { classes } = useStyles();
  const { data: albums } = useAlbumControllerFindAllArtistAlbums({});
  const theme = useMantineTheme();
  const router = useRouter();

  const items = results.results.map((song: any, i: number) => (
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
        You have {results?.results ? results?.results.length : 0} song licenses
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
        {items}
      </SimpleGrid>
    </Container>
  );
};

export default UserSongList;
