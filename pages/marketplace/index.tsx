import { MarketplaceList } from "@/components/MarketplaceList";
import { useMarketplaceControllerFindAll } from "@/services/api/raidar/raidarComponents";
import { Container, Loader } from "@mantine/core";

export const Marketplace = () => {
  const { data: marketplaceData } = useMarketplaceControllerFindAll({
    queryParams: { take: 1000 },
  });

  if (!marketplaceData) {
    return (
      <Container size="xs" py="sm">
        <Loader color="red" ml={"40%"} mt={"60%"} size={80} />
      </Container>
    );
  }

  return <MarketplaceList data={marketplaceData} />;
};

export default Marketplace;
