import { MarketplaceList } from "@/components/MarketplaceList";
import { useSongControllerFindAllUserSongs } from "@/services/api/raidar/raidarComponents";
import { Loader } from "@mantine/core";
import UserSongList from "@/components/user/UserSongList";

export const Songs = () => {
  const { data: results } = useSongControllerFindAllUserSongs({});

  //   console.log("results", results);

  if (!results) {
    return <Loader color="red" />;
  }

  return <UserSongList data={results} />;
};

export default Songs;
