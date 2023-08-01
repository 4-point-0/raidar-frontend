import { MarketplaceList } from "@/components/MarketplaceList";
import { useMarketplaceControllerFindAll } from "@/services/api/raidar/raidarComponents";
import { Loader } from "@mantine/core";

export const Marketplace = () => {
  const { data: marketplaceData } = useMarketplaceControllerFindAll({});

  if (!marketplaceData) {
    return <Loader color="red" />;
  }

  return <MarketplaceList data={marketplaceData} />;
};

export default Marketplace;
