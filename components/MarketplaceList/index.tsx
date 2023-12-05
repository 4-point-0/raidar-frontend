import { MarketplaceFilters } from "@/components/MarketplaceFilters";
import { userPlayerContext } from "@/context/PlayerContext";
import { useWalletSelector } from "@/context/WalletSelectorContext";
import { useFindUser } from "@/hooks/useFindUser";
import {
  MarketplaceControllerFindAllResponse,
  fetchContractControllerFindOne,
  fetchSongControllerBuySong,
  fetchUserControllerFindMe,
  useSongControllerFindAllUserSongs,
} from "@/services/api/raidar/raidarComponents";
import { SongDto, UserDto } from "@/services/api/raidar/raidarSchemas";
import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Group,
  Overlay,
  SimpleGrid,
  Text,
  Title,
  createStyles,
  rem,
  Modal,
  TextInput,
} from "@mantine/core";
import BN from "bn.js";
import {
  formatNearAmount,
  parseNearAmount,
} from "near-api-js/lib/utils/format";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { AlertCircle, Check, InfoCircle, PlayerPlay } from "tabler-icons-react";
import ImageWithBlurredShadow from "../ImageBlurShadow";
import SignatureCanvas, { SignatureCanvasMethods } from "../SignaturePad";
import createPDF from "@/utils/createPDF";

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

  const [modalOpened, setModalOpened] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongDto | null>(null);
  const [descriptionOfUse, setDescriptionOfUseValue] = useState<string>("");

  const { modal, accountId, callMethod } = useWalletSelector();

  const signatureCanvasRef = useRef<SignatureCanvas>(null);

  const signatureDataUrl = signatureCanvasRef.current?.getSignatureImage();

  const getUserData = async () => {
    const userData = await fetchUserControllerFindMe({});
    return userData;
  };

  const getContractData = async (songId: string) => {
    const contractData = await fetchContractControllerFindOne({
      pathParams: {
        id: songId,
      },
    });
    return contractData;
  };

  const {
    data: ownedSongs,
    isLoading,
    error,
    refetch,
  } = useSongControllerFindAllUserSongs({});

  const { user } = useFindUser();

  const { setSong } = userPlayerContext();

  const router = useRouter();
  const { errorCode, errorMessage, transactionHashes } = router.query;

  const storageCost = parseNearAmount("0.1");

  const updatingResults = (data: { results: SongDto[] }) => {
    setCurrentResults(data.results);
  };

  const checkIfOwned = (songId: string) => {
    return ownedSongs?.results?.find((song) => song.id === songId) != null;
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
    const notifyBuy = async () => {
      if (transactionHashes) {
        const dataString = localStorage.getItem("raidar-cart");
        if (!dataString) return;

        try {
          const data = JSON.parse(dataString);
          const songId = data.songId;
          const userId = data.userId;

          if (!songId || !userId) return;

          await fetchSongControllerBuySong({
            body: {
              songId,
              txHash: transactionHashes as string,
              buyerId: userId,
            },
          });

          refetch();
        } catch {}
      }
    };

    notifyBuy();
  }, []);

  const songFullPrice = (song: SongDto) => {
    const price = parseNearAmount(song.price);
    const deposit = new BN(storageCost as string)
      .add(new BN(price as string))
      .toString();

    return formatNearAmount(deposit);
  };

  const buySong = async (song: SongDto) => {
    removeQueryParam(["errorCode", "errorMessage", "transactionHashes"]);

    if (!accountId) {
      modal.show();
      return;
    }

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
      "raidar.near",
      "buy_nft",
      {
        token_id: song.token_contract_id.toString(),
      },
      deposit as any,
      "30000000000000" as any
    );
  };

  const handleCreatePdf = async (
    songId?: string,
    descriptionOfUse?: string
    // userMail?: string
  ) => {
    try {
      const userData = await getUserData();
      console.log("userData", userData);

      if (selectedSong) {
        const contractData = await getContractData(selectedSong.id);
        console.log("contractData", contractData);

        createPDF(
          songId, // songId
          undefined, // title
          undefined, // pka
          undefined, // length
          undefined, // price
          descriptionOfUse, // descriptionOfUse
          userData.email, // userMail
          signatureDataUrl, // signatureDataUrl
          contractData.pdfUrl, //pdfLink
          true // isBought
        );
      } else {
        throw new Error("Selected song is null or undefined.");
      }
    } catch (err) {
      console.error("error", err);
    }
  };

  const signatureModal = () => {
    return (
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Confirm the purchase"
        centered
      >
        <Text>
          Please provide your signature for the purchase contract?{" "}
          {selectedSong && selectedSong.id}
        </Text>
        <SignatureCanvas ref={signatureCanvasRef} />
        <TextInput
          mt="md"
          placeholder="In what purpose will this audio be used?"
          onChange={(event) =>
            setDescriptionOfUseValue(event.currentTarget.value)
          }
        />
        <Button
          color="red"
          mt="md"
          onClick={async () => {
            // buySong(song)
            if (selectedSong) {
              handleCreatePdf(selectedSong.id, descriptionOfUse);
            }
            // console.log("result", result);
          }}
        >
          Continue payment
        </Button>
      </Modal>
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
        <b>Playlist</b>
        {` ${song.album?.title}`}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        <b>Price in NEAR</b>
        {` ${songFullPrice(song)}`} Ⓝ
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        <b>Storage Price</b>
        {` ${song.storagePriceUsd}`} $
      </Text>
      <Group>
        <Avatar size="md" radius="xl" mt="md" color="red">
          {song.album?.pka?.charAt(0)}
        </Avatar>
        <Text fz="sm" mt="sm" fw={500}>
          {song.album?.pka}
        </Text>
      </Group>
      <Group>
        {checkIfOwned(song.id) ? (
          <Badge
            pl={2}
            mt={"lg"}
            size="lg"
            color="teal"
            radius="xl"
            leftSection={
              <ActionIcon
                size="xs"
                color="teal"
                radius="xl"
                variant="transparent"
              >
                <Check size={rem(20)} />
              </ActionIcon>
            }
          >
            Owned
          </Badge>
        ) : (
          <Button
            disabled={checkIfOwned(song.id)}
            mt="xl"
            className={classes.button}
            // onClick={() => {
            //   // buySong(song);
            // }}
            onClick={() => {
              setModalOpened(true);
              setSelectedSong(song);
              handleCreatePdf();
            }}
          >
            <Group spacing="xs">
              {song.priceInUsd ? (
                <Text>Buy for {parseFloat(song.priceInUsd).toFixed(2)} $</Text>
              ) : (
                "0"
              )}
            </Group>
          </Button>
        )}

        <Button
          ml={"auto"}
          mt="xl"
          color="red"
          variant="light"
          component={Link}
          href={`/user/songs/${song.id}`}
          leftIcon={<InfoCircle size={rem(18)} />}
        >
          Details
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

        {signatureModal()}
      </Container>
    </>
  );
};

export default MarketplaceList;
