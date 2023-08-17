import SongDetails from "@/components/SongDetails";
import { useRouter } from "next/router";
import { Loader } from "@mantine/core";
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
    return <Loader color="red" />;
  }

  return <SongDetails song={song} />;
};

export default Song;
