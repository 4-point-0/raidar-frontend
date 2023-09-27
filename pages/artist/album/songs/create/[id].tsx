import SongForm from "@/components/artist/Song/SongForm";
import { Container, Title } from "@mantine/core";

export const CreateSong = () => {
  return (
    <Container size="lg" py="sm">
      <Title order={2} ta="center" mb={20}>
        Create new song
      </Title>

      <SongForm albumIdProp={"0"} />
    </Container>
  );
};

export default CreateSong;
