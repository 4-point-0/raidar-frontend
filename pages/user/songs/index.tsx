import UserSongList from "@/components/user/UserSongList";
import { useSongControllerFindAllUserSongs } from "@/services/api/raidar/raidarComponents";
import { Container, Loader } from "@mantine/core";

export const Songs = () => {
  const { data, isLoading } = useSongControllerFindAllUserSongs({});

  if (isLoading) {
    return (
      <Container size="xs" py="sm">
        <Loader color="red" ml={"40%"} mt={"60%"} size={80} />
      </Container>
    );
  }

  return <UserSongList data={data} />;
};

export default Songs;
