import { MarketplaceList } from "@/components/MarketplaceList";
import { useMarketplaceControllerFindAll } from "@/services/api/components";
import { Loader } from "@mantine/core";

export const Marketplace = () => {
  const { data: marketplaceData } = useMarketplaceControllerFindAll({});

  console.log(marketplaceData);

  if (!marketplaceData) {
    return <Loader color="red" />;
  }

  return <MarketplaceList results={marketplaceData} />;
};

export default Marketplace;
