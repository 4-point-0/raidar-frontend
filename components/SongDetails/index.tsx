import React, { useState } from "react";
import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  rem,
  useMantineTheme,
  Box,
  Overlay,
  AspectRatio,
  Group,
  ActionIcon,
  SimpleGrid,
  Button,
  Avatar,
  Flex,
} from "@mantine/core";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsTags, BsCalendar2Date, BsGlobe } from "react-icons/bs";
import { BiLeftArrowAlt } from "react-icons/bi";
import { GiMusicSpell, GiMusicalKeyboard } from "react-icons/gi";
import { GiCuckooClock, GiMusicalNotes } from "react-icons/gi";
import { TfiLocationPin } from "react-icons/tfi";
import { TbUserShare, TbLanguage } from "react-icons/tb";

import SongAttributes from "./SongAttributes";
import formatDuration from "@/utils/formatDuration";
import { formatDate } from "@/utils/formatDate";
import { SongDto } from "@/services/api/raidar/raidarSchemas";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PlayerPlay } from "tabler-icons-react";
import ImageWithBlurredShadow from "../ImageBlurShadow";
import Tilt from "react-parallax-tilt";
import { userPlayerContext } from "@/context/PlayerContext";
import { Router, useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

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

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: rem(5),
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
  },

  button: {
    backgroundColor: theme.colors.red[5],
  },
}));

interface SongDetailsProps {
  song: SongDto;
}

export const SongDetails = ({ song }: any) => {
  // this is the example of the UI we want to recreate
  // https://noizd.com/assets/5831d56b-ceb4-426b-9b5e-d502a0670d30?listing_id=563
  const { classes } = useStyles();
  const { setSong } = userPlayerContext();

  const router = useRouter();

  const songAttributes = [
    // {
    //   label: "Length",
    //   value: formatDuration(song.length),
    //   icon: <AiOutlineClockCircle />,
    // },
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
    // {
    //   label: "BPM",
    //   value: song.bpm,
    //   icon: <GiCuckooClock />,
    // },
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
    {
      label: "Recording Date",
      value: formatDate(song.recording_date),
      icon: <BsCalendar2Date />,
    },
    {
      label: "Recording Location",
      value: song.recording_location,
      icon: <TfiLocationPin />,
    },
    {
      label: "Recording Country",
      value: song.recording_country,
      icon: <BsGlobe />,
    },
  ];

  return (
    <Container size="xl">
      <Button
        className={classes.button}
        leftIcon={<BiLeftArrowAlt />}
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      <Group mt="xl" position="center">
        <Box mt={10} mb={10}>
          <ImageWithBlurredShadow
            src={song.art.url}
            alt={song.title}
            height={400}
            blur={16}
            shadowOffset={-16}
          />
        </Box>
        <Box>
          <Box>
            <Title order={2} className={classes.title} ta="center" mt="xl">
              {song.title}
            </Title>
            <Box>
              <SimpleGrid mt="xl" cols={3} sx={{ textAlign: "center" }}>
                <Text c="red">
                  <b>Genre</b>
                </Text>
                <Text c="red">
                  <b>Length</b>
                </Text>
                <Text c="red">
                  <b>BPM</b>
                </Text>
                <Text c="dimmed">{song.genre}</Text>
                <Text c="dimmed">{formatDuration(song.length)}</Text>
                <Text c="dimmed">{song.bpm}</Text>
              </SimpleGrid>
            </Box>
            <Box>
              <Group mt="xl" position="left">
                <Avatar src={song.art.url} alt="it's me" />
                <Text c="dimmed" ta="center">
                  {song.pka}
                </Text>
              </Group>
            </Box>
          </Box>
        </Box>
      </Group>
      <SongAttributes songAttributes={songAttributes} />
    </Container>
  );
};

export default SongDetails;
