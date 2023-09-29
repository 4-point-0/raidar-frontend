import SongDetails from "@/components/SongDetails";
import { useRouter } from "next/router";
import { Container, Loader } from "@mantine/core";
import { useSongControllerFindOne } from "@/services/api/raidar/raidarComponents";

export const Song = () => {
  const router = useRouter();

  const songId = router.query.id;

  const { data: song } = useSongControllerFindOne({
    pathParams: {
      id: songId as string,
    },
  });

  if (!song) {
    return (
      <Container size="xs" py="sm">
        <Loader color="red" ml={"40%"} mt={"60%"} size={80} />
      </Container>
    );
  }

  return <SongDetails song={song} />;
};

export default Song;
