import { MarketplaceList } from "@/components/MarketplaceList";
import { useMarketplaceControllerFindAll } from "@/services/api/components";
import { Loader } from "@mantine/core";

export const Marketplace = () => {
  const { data: marketplaceSongList } = useMarketplaceControllerFindAll({});

  if (!marketplaceSongList) {
    return <Loader />;
  }

  return <MarketplaceList songList={marketplaceSongList} />;
};

export default Marketplace;
