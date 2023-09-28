import {
  ActionIcon,
  Box,
  Container,
  Grid,
  Group,
  Overlay,
  SimpleGrid,
  Text,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { BsGlobe, BsTags } from "react-icons/bs";
import {
  GiMusicSpell,
  GiMusicalKeyboard,
  GiMusicalNotes,
} from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { TbLanguage, TbUserShare } from "react-icons/tb";
import { TfiLocationPin } from "react-icons/tfi";
import Tilt from "react-parallax-tilt";

import SimilarSongsList from "@/components/SongDetails/SimilarSongsList";
import { SongDto } from "@/services/api/raidar/raidarSchemas";
import { formatDate } from "@/utils/formatDate";
import formatDuration from "@/utils/formatDuration";
import SongAttributes from "./SongAttributes";

import { userPlayerContext } from "@/context/PlayerContext";
import { useRouter } from "next/router";
import { Calendar, PlayerPlay } from "tabler-icons-react";
import ImageWithBlurredShadow from "../ImageBlurShadow";

const useStyles = createStyles((theme) => ({
  image: {
    flex: 1,
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
    margin: "auto",
  },

  root: {
    display: "flex",
    backgroundImage: `linear-gradient(-60deg, ${theme.colors.red[5]} 0%, ${theme.colors.dark[4]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      width: "50%",
      margin: "auto",
    },
    marginTop: "5%",
    opacity: 0.8,
  },

  value: {
    color: theme.white,
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.lg,
  },

  count: {
    color: theme.white,
    fontSize: rem(26),
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  stat: {
    flex: 1,

    "& + &": {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `${rem(1)} solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan("sm")]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },

    cardTitle: {
      "&::after": {
        content: '""',
        display: "block",
        backgroundColor: theme.colors.red[5],
        width: rem(45),
        height: rem(2),
        marginTop: theme.spacing.sm,
      },
    },
  },

  title: {
    fontSize: rem(30),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",
  },
}));

interface SongDetailsProps {
  song: SongDto;
}

export const SongDetails = ({ song }: SongDetailsProps) => {
  const { classes } = useStyles();
  const { setSong } = userPlayerContext();

  const router = useRouter();

  const songAttributes = [
    {
      label: "Mood",
      value: song.mood,
      icon: <GiMusicSpell />,
    },
    {
      label: "Tags",
      value: song.tags,
      icon: <BsTags />,
    },
    {
      label: "Instrumental",
      value: song.instrumental ? "Yes" : "No",
      icon: <GiMusicalNotes />,
    },
    {
      label: "Languages",
      value: song.languages,
      icon: <TbLanguage />,
    },
    {
      label: "Vocal Ranges",
      value: song.vocal_ranges,
      icon: <TbUserShare />,
    },
    {
      label: "Musical Key",
      value: song.musical_key,
      icon: <GiMusicalKeyboard />,
    },
  ];

  const PRIMARY_COL_HEIGHT = rem(300);

  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  return (
    <Container my="md">
      <Title ta="center" className={classes.title}>
        {song.title}
      </Title>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5%",
          textAlign: "center",
        }}
      >
        <div className={classes.description}>
          <Text c={theme.colors.red[5]} fw={800}>
            Length
          </Text>
          <Text c="dimmed">{formatDuration(song.length)}</Text>
        </div>

        <div className={classes.description}>
          <Text c={theme.colors.red[5]} fw={800}>
            Genre
          </Text>
          <Text c="dimmed">{song.genre}</Text>
        </div>

        <div className={classes.description}>
          <Text c={theme.colors.red[5]} fw={800}>
            BPM
          </Text>
          <Text c="dimmed">{song.bpm}</Text>
        </div>
      </Box>

      <SimpleGrid
        mt="xl"
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Box
          key={song.title}
          mb="lg"
          p="md"
          sx={(theme) => ({
            ":hover .song-image": {
              filter: "brightness(1.3)",
              transition: "all 0.2s ease-in-out",
            },
            ":hover .play-overlay": {
              display: "block",
            },
          })}
        >
          <Tilt
            className="song-image"
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1}
          >
            <ImageWithBlurredShadow
              src={song.art.url}
              alt={song.title}
              height={300}
              width={400}
              blur={16}
              shadowOffset={-16}
            />

            <Overlay
              radius="md"
              sx={{ display: "none", zIndex: 1 }}
              className="play-overlay"
              opacity={0}
            >
              <Group position="center" sx={{ height: "100%" }}>
                <ActionIcon
                  radius="xl"
                  sx={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    ":hover": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                  variant="light"
                  onClick={() => setSong(song)}
                >
                  <PlayerPlay size={40} strokeWidth={2} color={"black"} />
                </ActionIcon>
              </Group>
            </Overlay>
          </Tilt>
        </Box>

        <Grid gutter="md">
          <Grid.Col>
            <Box ml="xl">
              <Title order={5} mt="sm">
                Artist
              </Title>
              <Group mt="md" position="left">
                <RxAvatar />
                <Text c="dimmed" ta="center">
                  {song.pka}
                </Text>
              </Group>
              <Title order={5} mt="sm">
                Recording Country
              </Title>
              <Group mt="md" position="left">
                <TfiLocationPin />
                <Text c="dimmed" ta="center">
                  {song.recording_country}
                </Text>
              </Group>
              <Title order={5} mt="sm">
                Recording Location
              </Title>
              <Group mt="md" position="left">
                <BsGlobe />
                <Text c="dimmed" ta="center">
                  {song.recording_location}
                </Text>
              </Group>
              <Title order={5} mt="sm">
                Recording Date
              </Title>
              <Group mt="md" position="left">
                <Calendar size={18} />
                <Text c="dimmed" ta="center">
                  {formatDate(song.recording_date)}
                </Text>
              </Group>
            </Box>
          </Grid.Col>
        </Grid>
      </SimpleGrid>

      <Box mt="5%">
        <SongAttributes songAttributes={songAttributes} />
      </Box>
      <Title order={3} mt="md" mb="md">
        Similar Songs
      </Title>
      <SimilarSongsList songGenre={song.genre || ""} />
    </Container>
  );
};

export default SongDetails;
