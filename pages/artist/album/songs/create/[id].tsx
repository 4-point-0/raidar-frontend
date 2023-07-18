import React from "react";
import { Box, Title, Text, Container, SimpleGrid } from "@mantine/core";
import SongForm from "@/components/artist/Song/SongForm";

export const CreateAlbum = () => {
  return (
    // <Box>
    //   <Title ta="center" size={25} fw={500} mt="sm">
    //     Create new Album
    //   </Title>

    //   <Text c="dimmed" ta="center" mt="md">
    //     Explore and purchase licenses for a diverse selection of songs from
    //     talented artists in our marketplace, all powered by the convenience and
    //     security of cryptocurrencies.
    //   </Text>
    //   <AlbumForm />
    // </Box>

    <Container size="lg" py="sm">
      <Title order={2} ta="center" mb={20}>
        Create new song
      </Title>

      <SongForm />
    </Container>
  );
};

export default CreateAlbum;
