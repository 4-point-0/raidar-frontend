import { useSongControllerFindAllUserSongs } from "@/services/api/raidar/raidarComponents";
import { Container, Loader } from "@mantine/core";
import UserSongList from "@/components/user/UserSongList";

export const Songs = () => {
  const { data: results } = useSongControllerFindAllUserSongs({});

  if (!results) {
    return (
      <Container size="xs" py="sm">
        <Loader color="red" ml={"40%"} mt={"60%"} size={80} />
      </Container>
    );
  }

  return <UserSongList />;
};

export default Songs;
