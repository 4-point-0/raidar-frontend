import { MarketplaceFilters } from "@/components/MarketplaceFilters";
import { userPlayerContext } from "@/context/PlayerContext";
import { useWalletSelector } from "@/context/WalletSelectorContext";
import { useFindUser } from "@/hooks/useFindUser";
import {
  MarketplaceControllerFindAllResponse,
  fetchSongControllerBuySong,
} from "@/services/api/raidar/raidarComponents";
import { SongDto } from "@/services/api/raidar/raidarSchemas";
import {
  ActionIcon,
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Group,
  Image,
  Overlay,
  SimpleGrid,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import BN from "bn.js";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { AlertCircle, Check, PlayerPlay } from "tabler-icons-react";
import ImageWithBlurredShadow from "../ImageBlurShadow";

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

  button: {
    backgroundColor: theme.colors.red[5],
    ...theme.fn.hover({
      backgroundColor: theme.colors.red[8],
    }),
  },
}));

interface MarketplaceListProps {
  data: MarketplaceControllerFindAllResponse;
}

export const MarketplaceList = ({ data }: MarketplaceListProps) => {
  const { classes } = useStyles();
  const [currentResults, setCurrentResults] = useState<SongDto[]>(data.results);

  const { selector, modal, accountId, callMethod } = useWalletSelector();

  const { user } = useFindUser();

  const { setSong } = userPlayerContext();

  const router = useRouter();
  const { errorCode, errorMessage, transactionHashes } = router.query;

  const updatingResults = (data: { results: SongDto[] }) => {
    setCurrentResults(data.results);
  };

  const removeQueryParam = (paramToRemove: string[]) => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query as any);
    paramToRemove.forEach((param) => params.delete(param));
    router.replace({ pathname, query: params.toString() }, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (transactionHashes) {
      const dataString = localStorage.getItem("raidar-cart");
      if (!dataString) return;

      try {
        const data = JSON.parse(dataString);
        const songId = data.songId;
        const userId = data.userId;

        if (!songId || !userId) return;

        fetchSongControllerBuySong({
          body: {
            songId,
            txHash: transactionHashes as string,
            buyerId: userId,
          },
        });
      } catch {}
    }
  }, []);

  const buySong = async (song: SongDto) => {
    removeQueryParam(["errorCode", "errorMessage", "transactionHashes"]);

    if (!accountId) {
      modal.show();
      return;
    }

    const storageCost = parseNearAmount("0.1");
    const price = parseNearAmount(song.price);
    const deposit = new BN(storageCost as string)
      .add(new BN(price as string))
      .toString();

    localStorage.setItem(
      "raidar-cart",
      JSON.stringify({
        songId: song.id,
        userId: user?.id,
      })
    );

    await callMethod(
      "raidar-dev.testnet",
      "buy_nft",
      {
        token_id: song.token_contract_id.toString(),
      },
      deposit as any,
      "30000000000000" as any
    );
  };

  const features = currentResults.map((song: SongDto) => (
    <Box
      key={song.title}
      mb="lg"
      p="md"
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
      <Text fz="sm" c="dimmed" mt="sm">
        <b>Album</b>
        {` ${song.album?.title}`}
      </Text>
      <Group>
        <Avatar
          // src={"/images/avatar-placeholder.png"}
          size="md"
          radius="xl"
          mt="md"
          color="red"
        >
          {song.album?.pka?.charAt(0)}
        </Avatar>
        <Text fz="sm" mt="sm" fw={500}>
          {song.album?.pka}
        </Text>
      </Group>
      <Group>
        <Button
          mt="xl"
          className={classes.button}
          onClick={() => {
            buySong(song);
          }}
        >
          <Group spacing="xs">
            <Text>Buy for {song.price}</Text>{" "}
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

        {transactionHashes && (
          <Alert my={"md"} icon={<Check size={16} />} title="Success">
            Transaction has been successfully signed.
          </Alert>
        )}
        {/* 
        {errorCode && errorCode === "userRejected" && (
          <Alert
            my={"md"}
            icon={<AlertCircle size={16} />}
            title="Transaction rejected by user"
            color="red"
          >
            You rejected the transaction.
          </Alert>
        )} */}

        {errorCode && errorCode !== "userRejected" && errorMessage && (
          <Alert
            my={"md"}
            icon={<AlertCircle size={16} />}
            title="Something went wrong"
            color="red"
          >
            Something went wrong, please try again.
          </Alert>
        )}

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
