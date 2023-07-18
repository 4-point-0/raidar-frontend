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
} from "@mantine/core";
import { Box, PigMoney } from "tabler-icons-react";

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

interface Songs {
  image?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  src?: string;
}

interface MarketplaceSongs {
  songList: Songs[];
}

export const MarketplaceList = ({ songList }: MarketplaceSongs) => {
  const { classes } = useStyles();

  const features = songList.map((song: any) => (
    <Card
      key={song.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <Image src={song.src} mx={"auto"} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {song.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {`${song.description.slice(0, 60)}...`}
      </Text>
      <Group>
        <Avatar
          src={"/images/avatar-placeholder.png"}
          size={20}
          radius={80}
          mt="md"
        />
        <Text fz="sm" mt="sm">
          {song.artist_name}
        </Text>
      </Group>
      <Group>
        <Button mt="xl" color="red">
          <PigMoney size={20} />
          <Text ml="sm">Buy</Text>
        </Button>
        <Text mt={25} ml="30%" fw={600}>
          {song.price}
        </Text>
        <Image width={15} mt={25} src={"/images/near-protocol-logo.png"} />
      </Group>
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
};

export default MarketplaceList;
