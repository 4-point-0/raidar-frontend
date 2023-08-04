import React from "react";
import { Title, Container } from "@mantine/core";
import SongForm from "@/components/artist/Song/SongForm";

export const CreateSong = () => {
  return (
    <Container size="lg" py="sm">
      <Title order={2} ta="center" mb={20}>
        Create new song
      </Title>

      <SongForm />
    </Container>
  );
};

export default CreateSong;
