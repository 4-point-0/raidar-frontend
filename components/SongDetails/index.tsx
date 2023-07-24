import React from "react";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { AiOutlineClockCircle } from "react-icons/ai";
import {
  BsMusicPlayer,
  BsTags,
  BsCalendar2Date,
  BsGlobe,
} from "react-icons/bs";
import { GiMusicSpell, GiMusicalKeyboard } from "react-icons/gi";
import { GiCuckooClock, GiMusicalNotes } from "react-icons/gi";
import { GrLanguage, GrLocation } from "react-icons/gr";
import { TbUserShare } from "react-icons/tb";

import SongAttributes from "./SongAttributes";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

interface LastListing {
  id: string;
  seller: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    roles: string[];
    provider: string;
    provider_id: string;
    wallet_address: null;
    created_at: string;
    updated_at: string;
  };
  buyer: null;
  tx_hash: null;
  price: string;
  created_at: string;
  updated_at: string;
  created_by_id: string;
  updated_by_id: string;
}

interface Music {
  id: string;
  name: string;
  url: string;
  key: string;
  mime_type: string;
  url_expiry: string | null;
  created_at: string;
  updated_at: string;
  created_by_id: string;
  updated_by_id: string;
}

interface Art {
  id: string;
  name: string;
  url: string;
  key: string;
  mime_type: string;
  url_expiry: string | null;
  created_at: string;
  updated_at: string;
  created_by_id: string;
  updated_by_id: string;
}

interface Song {
  id: string;
  user_id: string;
  title: string;
  length: number;
  genre: string;
  mood: string[];
  tags: string[];
  bpm: number;
  instrumental: boolean;
  languages: string[];
  vocal_ranges: string[];
  musical_key: string;
  recording_date: string;
  recording_location: string;
  recording_country: string;
  pka: string;
  last_listing: LastListing;
  music: Music;
  art: Art;
  album: string | null;
}

interface SongDetailsProps {
  song: Song;
}

export const SongDetails = ({ song }: SongDetailsProps) => {
  const { classes } = useStyles();

  const songAttributes = [
    {
      label: "Length",
      value: song.length,
      icon: <AiOutlineClockCircle />,
    },
    {
      label: "Genre",
      value: song.genre,
      icon: <BsMusicPlayer />,
    },
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
      label: "BPM",
      value: song.bpm,
      icon: <GiCuckooClock />,
    },
    {
      label: "Instrumental",
      value: song.instrumental,
      icon: <GiMusicalNotes />,
    },
    {
      label: "Languages",
      value: song.languages,
      icon: <GrLanguage />,
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
      value: song.recording_date,
      icon: <BsCalendar2Date />,
    },
    {
      label: "Recording Location",
      value: song.recording_location,
      icon: <GrLocation />,
    },
    {
      label: "Recording Country",
      value: song.recording_country,
      icon: <BsGlobe />,
    },
  ];

  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>{song.title}</Title>
            <Text color="dimmed" mt="md">
              {song.genre}
            </Text>

            <SongAttributes songAttributes={songAttributes} />
          </div>

          <Image src={`${song.art.url}`} className={classes.image} />
        </div>
      </Container>
    </div>
  );
};

export default SongDetails;
