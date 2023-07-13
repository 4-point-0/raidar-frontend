import {
  Image,
  Text,
  Container,
  ThemeIcon,
  Title,
  SimpleGrid,
  createStyles,
  rem,
  Button,
} from "@mantine/core";
import { Disc } from "tabler-icons-react";

import Link from "next/link";

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

  supTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: 800,
    fontSize: theme.fontSizes.sm,
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      .color,
    letterSpacing: rem(0.5),
  },

  title: {
    lineHeight: 1,
    textAlign: "center",
    marginTop: theme.spacing.sm,
  },

  description: {
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },

  highlight: {
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    padding: rem(5),
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: "inline-block",
    color: theme.colorScheme === "dark" ? theme.white : "inherit",
  },
}));

interface FeatureImage {
  image: string;
  title: React.ReactNode;
  description: React.ReactNode;
  src: string;
}

interface FeaturesImagesProps {
  supTitle?: React.ReactNode;
  description?: React.ReactNode;
  data?: FeatureImage[];
  albumList: FeatureImage[];
}

const ArtistAlbums = ({
  albumList,
  supTitle,
  description,
}: FeaturesImagesProps) => {
  const { classes } = useStyles();

  const items = albumList.map((item) => (
    <div className={classes.item} key={item.image}>
      <ThemeIcon
        variant="light"
        className={classes.itemIcon}
        size={80}
        radius="md"
      >
        <Image src={item.src} />
      </ThemeIcon>

      <div>
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text c="dimmed">{item.description}</Text>
      </div>
    </div>
  ));

  return (
    <Container size={700} className={classes.wrapper}>
      <Text className={classes.supTitle}>{supTitle}</Text>

      <Title className={classes.title} order={2}>
        My Albums
      </Title>

      <Button
        component={Link}
        href="/artist/album/create"
        color="red"
        leftIcon={<Disc size={20} />}
      >
        Add New Album
      </Button>

      <Container size={660} p={0}>
        <Text color="dimmed" className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid
        cols={2}
        spacing={50}
        breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}
        style={{ marginTop: 30 }}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
};

export default ArtistAlbums;
