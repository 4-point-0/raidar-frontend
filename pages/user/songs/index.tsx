import { useSongControllerFindAllUserSongs } from "@/services/api/raidar/raidarComponents";
import { Loader } from "@mantine/core";
import UserSongList from "@/components/user/UserSongList";

export const Songs = () => {
  const { data: results } = useSongControllerFindAllUserSongs({});

  if (!results) {
    return <Loader color="red" />;
  }

  return <UserSongList />;
};

export default Songs;
