import SongDetails from "@/components/SongDetails";
import { useRouter } from "next/router";
import { useSongControllerFindOne } from "@/services/api/artist/artistComponents";
import { Loader } from "@mantine/core";

export const Song = () => {
  const router = useRouter();

  const songId = router.query.id;

  const { data: song } = useSongControllerFindOne({
    pathParams: {
      id: songId as string,
    },
  });

  if (!song) {
    return <Loader color="red" />;
  }

  return <SongDetails song={song} />;
};

export default Song;
