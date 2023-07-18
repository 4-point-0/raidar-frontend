import React from "react";
import { Box, Title, Text, Container, SimpleGrid } from "@mantine/core";
import AlbumForm from "../../../../components/artist/Album/AlbumForm";

export const CreateAlbum = () => {
  return (
    <Container size="lg" py="sm">
      <Title order={2} ta="center" mb={20}>
        Create new Album
      </Title>

      <AlbumForm />
    </Container>
  );
};

export default CreateAlbum;
