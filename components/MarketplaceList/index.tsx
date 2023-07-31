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
} from "@mantine/core";
import { PigMoney, Stack } from "tabler-icons-react";
import { MarketplaceDto } from "@/services/api/schemas";
import { MarketplaceFilters } from "@/components/MarketplaceFilters";
import { MarketplaceFiltersAccordion } from "@/components/MarketplaceFiltersAccordion/Index";
import { useState } from "react";

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
      backgroundColor: "red",
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
      backgroundColor: "red",
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

// interface MarketplaceSongs {
//   songList: MarketplaceDto;
// }

export const MarketplaceList = ({ results }: any) => {
  const { classes } = useStyles();
  const [currentResults, setCurrentResults] = useState<any[]>(results.results);

  const updatingResults = (data: any) => {
    setCurrentResults(data.results);
  };

  const features = currentResults.map((song: any) => (
    <Card
      key={song.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <Box mx="auto">
        <img
          src={song.art.url}
          alt=""
          style={{
            width: "300px",
            height: "300px",
            objectFit: "contain",
          }}
        />
      </Box>

      <Text fz="lg" fw={600} className={classes.cardTitle} mt="md">
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
        <Text fz="sm" mt="sm">
          {song.album.pka}
        </Text>
      </Group>
      <Group>
        <Button mt="xl" color="red">
          <PigMoney size={20} />
          <Text ml="sm">Buy</Text>
        </Button>
        <Text mt={25} ml="30%" fw={600}>
          {song.last_listing.price}
        </Text>
        <Image width={15} mt={25} src={"/images/near-protocol-logo.png"} />
      </Group>
    </Card>
  ));

  return (
    <>
      <MarketplaceFilters />
      <Container size="lg" py="sm">
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Explore the Marketplace
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Explore and purchase licenses for a diverse selection of songs from
          talented artists in our marketplace, all powered by the convenience
          and security of cryptocurrencies.
        </Text>

        <MarketplaceFiltersAccordion onUpdatedResults={updatingResults} />

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
