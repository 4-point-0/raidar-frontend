import {
  Alert,
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { AlertCircle, Check, Plus, Wallet } from "tabler-icons-react";

import ImageWithBlurredShadow from "@/components/ImageBlurShadow";
import { useWalletSelector } from "@/context/WalletSelectorContext";
import { useAlbumControllerFindOne } from "@/services/api/raidar/raidarComponents";
import { SongDto } from "@/services/api/raidar/raidarSchemas";
import formatDuration from "@/utils/formatDuration";
import { useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useRouter } from "next/router";
import SongForm from "../../Song/SongForm";

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

  const isMobile = useMediaQuery("(max-width: 768px)");

  const { selector, modal, accountId } = useWalletSelector();

  const { errorCode, errorMessage, transactionHashes } = router.query;

  const removeQueryParam = (paramToRemove: string[]) => {
    const { pathname, query } = router;
    const params = new URLSearchParams(query as any);
    paramToRemove.forEach((param) => params.delete(param));
    router.replace({ pathname, query: params.toString() }, undefined, {
      shallow: true,
    });
  };

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
        sx={{ backgroundImage: `url(${album?.cover?.url})` }}
      />
      <Container size={800} className={classes.wrapper}>
        <Flex justify="center" align="center" direction="row" mb={"xl"}>
          <ImageWithBlurredShadow
            src={album?.cover?.url ?? ""}
            alt={album?.title ?? ""}
            height={200}
            width={200}
            blur={8}
            shadowOffset={0}
          />
        </Flex>

        <Title className={classes.title} order={2} fw={700} fz={40}>
          {album?.title}
        </Title>

        <Title order={4} className={classes.title} fw={700} fz={40}>
          {album?.pka}
        </Title>

        {transactionHashes && (
          <Alert my={"md"} icon={<Check size={16} />} title="Success">
            Transaction has been successfully signed.
          </Alert>
        )}

        {/* {errorCode && errorCode === "userRejected" && (
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

        {!accountId && (
          <Alert
            icon={<AlertCircle size="1rem" />}
            title="You need to connect NEAR wallet"
            color="red"
            radius="md"
            variant="light"
          >
            Please connect NEAR wallet to be able to create a new song.
          </Alert>
        )}

        {!accountId && (
          <Button
            onClick={() => modal.show()}
            color="red"
            opacity={0.9}
            mt={"md"}
          >
            <Box mr="sm">
              <Wallet size={20} />
            </Box>
            Connect Wallet
          </Button>
        )}

        {accountId && (
          <Button
            mx="auto"
            color="red"
            opacity={0.9}
            onClick={() => {
              removeQueryParam([
                "errorCode",
                "errorMessage",
                "transactionHashes",
              ]);

              if (!accountId) {
                modal.show();
                return;
              }

              modals.open({
                fullScreen: isMobile,

                title: `Create new song`,
                children: <SongForm albumIdProp={albumId as string} />,
              });
            }}
          >
            <Plus size={20} /> Add Song
          </Button>
        )}

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
