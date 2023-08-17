import { Carousel } from "@mantine/carousel";
import { useMarketplaceControllerFindAll } from "@/services/api/raidar/raidarComponents";
import ImageWithBlurredShadow from "@/components/ImageBlurShadow";
import { useRouter } from "next/router";
import { Box } from "@mantine/core";

interface SimilarSongsListProps {
  songGenre: string;
}

export const SimilarSongsList: React.FC<SimilarSongsListProps> = ({
  songGenre,
}) => {
  const router = useRouter();

  console.log(songGenre);
  const { data: marketplaceData } = useMarketplaceControllerFindAll({
    queryParams: { genre: songGenre },
  });

  return (
    <Carousel
      withIndicators
      height={300}
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={3}
    >
      {marketplaceData?.results.map((song, index) => {
        return (
          <Carousel.Slide key={index}>
            <Box onClick={() => router.push(`/artist/song/${song.id}`)}>
              <ImageWithBlurredShadow
                src={song.art.url}
                alt={song.title}
                height={300}
                blur={16}
                shadowOffset={-16}
              />
            </Box>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default SimilarSongsList;
