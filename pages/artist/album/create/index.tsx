import React from "react";
import { Title, Container, createStyles, rem, Text } from "@mantine/core";
import AlbumForm from "../../../../components/artist/Album/AlbumForm";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(30),
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
}));

export const CreateAlbum = () => {
  const { classes } = useStyles();
  return (
    <Container size="lg" py="sm">
      <Title ta="center" className={classes.title}>
        Create new playlist
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="xl">
        Unleash your creativity and craft your very own musical journey. Create
        an ablum and share it with the world.
      </Text>

      <AlbumForm />
    </Container>
  );
};

export default CreateAlbum;
