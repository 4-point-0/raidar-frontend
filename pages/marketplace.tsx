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
} from "@mantine/core";
import { PigMoney } from "tabler-icons-react";

const songList = [
  {
    title: "Silhouette of Yesterday",
    description:
      "A melodious journey back in time, bringing back nostalgic memories and past echoes.",
    src: "https://i.pinimg.com/564x/48/e0/86/48e0865834fdbc664eef04e5a28be482.jpg",
    price: "20",
  },
  {
    title: "Moonlight Whispers",
    description:
      "A tranquil and peaceful symphony that speaks the language of the night, the moon and the stars.",
    src: "https://i.pinimg.com/564x/6b/e8/97/6be8979e3e3372e4241312562f030872.jpg",
  },
  {
    title: "Crimson Echoes",
    description:
      "An intense and fiery musical experience that resonates with strong emotions and passions.",
    src: "https://i.pinimg.com/564x/b9/66/0a/b9660aa5361ae51362805f694bf9cf08.jpg",
  },
  {
    title: "Sapphire Skies",
    description:
      "A soothing tune that mirrors the serenity and vastness of clear blue skies.",
    src: "https://i.pinimg.com/564x/29/f2/da/29f2dace59c995b6e0425e1c26f2615e.jpg",
  },
  {
    title: "Shadows on the Canvas",
    description:
      "A creative fusion of sounds, offering a mysterious and intriguing auditory experience.",
    src: "https://i.pinimg.com/564x/c9/64/b4/c964b4e8dd63bfd402ae4d8a6cbbd5e5.jpg",
  },
  {
    title: "Midnight Carousel",
    description:
      "A whimsical and enchanting musical ride that transports you to magical realms.",
    src: "https://i.pinimg.com/564x/40/ec/e3/40ece3e45e133882837b2b70c4933633.jpg",
  },
  {
    title: "Daydream Symphony",
    description:
      "A harmonious ensemble that evokes feelings of light-hearted daydreams and positivity.",
    src: "https://i.pinimg.com/564x/03/26/ee/0326ee54be41beccf4920b6f5fcc6757.jpg",
  },
  {
    title: "Phoenix's Flight",
    description:
      "An inspiring and uplifting melody, embodying the resilience and majesty of the mythical bird.",
    src: "https://i.pinimg.com/564x/76/d5/dd/76d5dd99b0463a49503f6dbd2defe98d.jpg",
  },
  {
    title: "Neon Heartbeat",
    description:
      "A vibrant track that pulses with the rhythm of the city and the beat of the heart.",
    src: "https://i.pinimg.com/564x/b1/1a/ac/b11aac5aacf4ac6dd1fa7c0158f3b1b1.jpg",
  },
];

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
      backgroundColor: theme.fn.primaryColor(),
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
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

function Marketplace() {
  const { classes } = useStyles();
  const features = songList.map((song) => (
    <Card
      key={song.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <Image src={song.src} mx={"auto"} />
      <Text fz="lg" fw={500} className={useStyles.cardTitle} mt="md">
        {song.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {`${song.description.slice(0, 80)}...`}
      </Text>
      <Grid>
        <Grid.Col span={4}>
          <Button mt="xl" color="red">
            <PigMoney size={20} />
            <Text ml="sm">Buy</Text>
          </Button>
        </Grid.Col>
        {/* <Grid.Col span={4}>
          <Group>
            <Text>{song.price}</Text>
            <Image width={15} mt={25} src={"/images/near-protocol-logo.png"} />
          </Group>
        </Grid.Col> */}
      </Grid>
    </Card>
  ));

  return (
    <Container size="lg" py="sm">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Explore the Marketplace
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Explore and purchase licenses for a diverse selection of songs from
        talented artists in our marketplace, all powered by the convenience and
        security of cryptocurrencies.
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}

export default Marketplace;
