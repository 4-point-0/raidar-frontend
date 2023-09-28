import ImageWithBlurredShadow from "@/components/ImageBlurShadow";
import { useMarketplaceControllerFindAll } from "@/services/api/raidar/raidarComponents";
import { Carousel } from "@mantine/carousel";
import { Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";

interface SimilarSongsListProps {
  songGenre: string;
}

export const SimilarSongsList: React.FC<SimilarSongsListProps> = ({
  songGenre,
}) => {
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data: marketplaceData } = useMarketplaceControllerFindAll({
    queryParams: { genre: songGenre },
  });

  return (
    <Carousel
      withIndicators
      height={300}
      slideSize={isMobile ? undefined : "33.333333%"}
      slideGap="md"
      loop
      align="start"
      slidesToScroll={isMobile ? 1 : 3}
    >
      {marketplaceData?.results.map((song, index) => {
        return (
          <Carousel.Slide key={index}>
            <Box onClick={() => router.push(`/artist/song/${song.id}`)}>
              <ImageWithBlurredShadow
                src={song.art.url}
                alt={song.title}
                height={300}
                blur={0}
                shadowOffset={0}
              />
            </Box>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default SimilarSongsList;
