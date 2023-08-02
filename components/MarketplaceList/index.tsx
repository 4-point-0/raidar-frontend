import {
  createStyles,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  Image,
  Button,
  Grid,
  Group,
  Avatar,
  Box,
  ActionIcon,
  Overlay,
} from "@mantine/core";
import { PlayerPlay } from "tabler-icons-react";
import { MarketplaceFilters } from "@/components/MarketplaceFilters";
import { useState } from "react";
import { userPlayerContext } from "@/context/PlayerContext";
import { MarketplaceControllerFindAllResponse } from "@/services/api/raidar/raidarComponents";
import { SongDto } from "@/services/api/raidar/raidarSchemas";
import ImageWithBlurredShadow from "../ImageBlurShadow";
import Tilt from 'react-parallax-tilt';

const useStyles = createStyles((theme) => ({
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

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
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

  item: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

interface MarketplaceListProps {
  data: MarketplaceControllerFindAllResponse;
}

export const MarketplaceList = ({ data }: MarketplaceListProps) => {
  const { classes } = useStyles();
  const [currentResults, setCurrentResults] = useState<SongDto[]>(data.results);

  const { setSong } = userPlayerContext();

  const updatingResults = (data: any) => {
    setCurrentResults(data.results);
  };

  const features = currentResults.map((song: SongDto) => (
    <Box
      key={song.title}
      mb="lg"
      p="md"
      sx={(theme) => ({
        ":hover": {
          cursor: "pointer",
          backgroundColor: theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[2],
          borderRadius: theme.radius.md,
          transition: "all 0.2s ease-in-out",
        },
        ":hover .song-image": {
          filter: "brightness(1.3)",
          transition: "all 0.2s ease-in-out",
        },
        ":hover .play-overlay": {
          display: "block",
        },
      })}
    >
      <Tilt className="song-image" tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1}>

          <ImageWithBlurredShadow
            src={song.art.url}
            alt={song.title}
            height={300}
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

      <Text fz="lg" fw={600} className={classes.cardTitle} mt="xl">
        {song.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        <b>Genre</b>
        {` ${song.genre}`}
      </Text>
      <Group>
        <Avatar
          src={"/images/avatar-placeholder.png"}
          size={20}
          radius={80}
          mt="md"
        />
        <Text fz="sm" mt="sm" fw={500}>
          {song.album?.pka}
        </Text>
      </Group>
      <Group>
        <Button mt="xl" color="red">
          <Group spacing="xs">
            <Text>Buy for {song.last_listing?.price}</Text>{" "}
            <Image width={14} src={"/images/near-logo-white.svg"} />
          </Group>
        </Button>
      </Group>
    </Box>
  ));

  return (
    <>
      <Container size="lg" py="sm">
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Explore the Marketplace
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Explore and purchase licenses for a diverse selection of songs from
          talented artists in our marketplace, all powered by the convenience
          and security of cryptocurrencies.
        </Text>

        <MarketplaceFilters onUpdatedResults={updatingResults} />

        <SimpleGrid
          cols={3}
          spacing="xl"
          mt={50}
          breakpoints={[{ maxWidth: "md", cols: 1 }]}
        >
          {features}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default MarketplaceList;
