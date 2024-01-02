import { MarketplaceFilters } from "@/components/MarketplaceFilters";
import { userPlayerContext } from "@/context/PlayerContext";
import { useWalletSelector } from "@/context/WalletSelectorContext";
import { useFindUser } from "@/hooks/useFindUser";
import {
  MarketplaceControllerFindAllResponse,
  fetchContractControllerFindOne,
  fetchSongControllerBuySong,
  fetchStripeControllerCreateSession,
  useSongControllerFindAllUserSongs,
} from "@/services/api/raidar/raidarComponents";
import { SongDto } from "@/services/api/raidar/raidarSchemas";
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
  Flex,
  HoverCard,
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
import SignatureCanvas from "../SignaturePad";
import createPDF from "@/utils/createPDF";
import { useSession } from "next-auth/react";

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

  const { data: session } = useSession();

  const [modalOpened, setModalOpened] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongDto | null>(null);
  const [descriptionOfUse, setDescriptionOfUseValue] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [signatureData, setSignatureData] = useState<any>(null);

  const { modal, accountId, callMethod } = useWalletSelector();

  const signatureCanvasRef = useRef<SignatureCanvas>(null);

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

  useEffect(() => {
    if (signatureData && selectedSong) {
      paymentMethod === "near"
        ? buySongNear(selectedSong)
        : buySongUsd(selectedSong);
    }
  }, [signatureData, selectedSong, paymentMethod]);

  const songFullPrice = (song: SongDto) => {
    const price = parseNearAmount(song.price);
    const deposit = new BN(storageCost as string)
      .add(new BN(price as string))
      .toString();

    return formatNearAmount(deposit);
  };

  const buySongNear = async (song: SongDto) => {
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

    await handleCreatePdf(song.id, descriptionOfUse);

    await callMethod(
      process.env.NEXT_PUBLIC_CONTRACT_NAME as string,
      "buy_nft",
      {
        token_id: song.token_contract_id.toString(),
      },
      deposit as any,
      "30000000000000" as any
    );
  };

  const buySongUsd = async (song: SongDto) => {
    const response: any = await fetchStripeControllerCreateSession({
      pathParams: { songId: song.id },
    });

    if (signatureData) {
      localStorage.setItem("selectedSong", JSON.stringify(selectedSong));
      localStorage.setItem(
        "descriptionOfUse",
        JSON.stringify(descriptionOfUse)
      );
      localStorage.setItem("signature", JSON.stringify(signatureData));
      localStorage.setItem("userData", JSON.stringify(session?.user?.email));

      if (selectedSong) {
        const data = (await getContractData(selectedSong.id)) as any;
        localStorage.setItem("contractData", JSON.stringify(data));
      }

      if (response) {
        router.push(response.url);
      }
    } else {
      alert("please provide signature");
    }
  };

  const getContractData = async (songId: string) => {
    const contractData = await fetchContractControllerFindOne({
      pathParams: {
        id: songId,
      },
    });
    return contractData;
  };

  const handleCreatePdf = async (
    songId?: string,
    descriptionOfUse?: string
  ) => {
    try {
      const signatureDataUrl = signatureCanvasRef.current?.getSignatureImage();

      if (selectedSong && session?.user?.email) {
        const { data } = (await getContractData(selectedSong.id)) as any;

        const { pdfUrl } = data;

        await createPDF(
          songId, // songId
          undefined, // title
          undefined, // pka
          undefined, // length
          undefined, // price
          descriptionOfUse, // descriptionOfUse
          session?.user?.email, // userMail
          signatureDataUrl, // signatureDataUrl
          pdfUrl, // pdfLink
          true // isBought
        );
      } else {
        throw new Error("Selected song is null or undefined.");
      }
    } catch (err: any) {
      console.error("Error in handleCreatePdf:", err.message);
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
        <Text>Please provide your signature for the purchase contract?</Text>
        <SignatureCanvas ref={signatureCanvasRef} />
        <TextInput
          mt="md"
          placeholder="In what purpose will this audio be used?"
          onChange={(event) =>
            setDescriptionOfUseValue(event.currentTarget.value)
          }
        />
        {/* <Button
          color="red"
          mt="md"
          disabled={!descriptionOfUse}
          onClick={async () => {
            if (selectedSong) {
              console.log("paymentMethod", paymentMethod);
              console.log("songId", selectedSong.id);
              setSignatureData(signatureCanvasRef.current?.getSignatureImage());

              console.log("signatureImage", signatureData);

              // setSignatureData(signatureImage);
              console.log("signature", signatureData);

              paymentMethod === "near"
                ? buySongNear(selectedSong)
                : buySongUsd(selectedSong);
              setModalOpened(false);
            }
          }}
        >
          Continue payment
        </Button> */}
        <Button
          color="red"
          mt="md"
          disabled={!descriptionOfUse}
          onClick={() => {
            if (selectedSong) {
              // Set signature data, triggering useEffect
              setSignatureData(signatureCanvasRef.current?.getSignatureImage());
              setModalOpened(false);
            }
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
          <HoverCard width={200} shadow="md" radius="md" closeDelay={1}>
            <HoverCard.Target>
              <Button className={classes.button} mt="xl">
                Buy for {parseFloat(song.priceInUsd || "0").toFixed(2)} $
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm">
                <Flex
                  mih={30}
                  bg="var(--mantine-color-body)"
                  gap="md"
                  justify="center"
                  align="center"
                  direction="column"
                  wrap="wrap"
                >
                  <Button
                    disabled={checkIfOwned(song.id)}
                    mt="ms"
                    className={classes.button}
                    onClick={() => {
                      setPaymentMethod("near");
                      setModalOpened(true);
                      setSelectedSong(song);
                    }}
                  >
                    <Group spacing="xs">
                      {song.priceInUsd ? <Text>Pay with NEAR</Text> : "0"}
                    </Group>
                  </Button>
                  <Button
                    disabled={checkIfOwned(song.id)}
                    mt="sm"
                    className={classes.button}
                    onClick={() => {
                      setPaymentMethod("usd");
                      setModalOpened(true);
                      setSelectedSong(song);
                    }}
                  >
                    <Group spacing="xs">
                      {song.priceInUsd ? <Text>Pay with USD</Text> : "0"}
                    </Group>
                  </Button>
                </Flex>
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
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
