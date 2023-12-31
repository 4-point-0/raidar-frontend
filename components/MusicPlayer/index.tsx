import { userPlayerContext } from "@/context/PlayerContext";
import {
  ActionIcon,
  Card,
  CloseButton,
  Group,
  MediaQuery,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { BsPause, BsPlay } from "react-icons/bs";
import ImageWithBlurredShadow from "../ImageBlurShadow";

export const MusicPlayer = () => {
  const { song, setSong, setIsVisible } = userPlayerContext();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [value, setValue] = useState(0);
  const [endValue, setEndValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(new Audio(song?.music.url));
  useEffect(() => {
    setValue(0);
    setEndValue(0);
    audioRef.current.src = song?.music.url ?? "";
    audioRef.current.play();
    setIsPlaying(true);
  }, [song]);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  const closePlayer = () => {
    setIsVisible(false);
    setIsPlaying(false);
    setTimeout(() => {
      setSong(null);
    }, 200);
  };

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleTimeUpdate = () => {
    setValue(audioRef.current.currentTime);
    setEndValue(audioRef.current.duration);
  };

  const handleSeek = (value: number) => {
    audioRef.current.currentTime = value;
    setValue(value);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card sx={{ width: "100%" }}>
      <Group spacing={isMobile ? "0" : "md"}>
        <ImageWithBlurredShadow
          src={song?.art.url ?? ""}
          alt={song?.title ?? ""}
          height={isMobile ? 60 : 80}
          width={isMobile ? 60 : 80}
        />

        <Stack ml="md" spacing="xs">
          <Text fz={isMobile ? "sm" : "lg"} fw={600}>
            {song?.title}
          </Text>
          <Text fz="sm">{song?.pka}</Text>
        </Stack>

        <ActionIcon
          ml={"xl"}
          variant="light"
          color="red"
          size="xl"
          radius="sm"
          onClick={handlePlayPause}
        >
          {isPlaying ? <BsPause size={40} /> : <BsPlay size={40} />}
        </ActionIcon>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Stack ml="auto" mr="auto" sx={{ width: "55%" }}>
            <Slider
              label={(value) => formatTime(value)}
              value={value}
              onChange={handleSeek}
              max={endValue}
              color="red"
            />
            <Group position="apart">
              <Text>{formatTime(value)}</Text>
              <Text>{formatTime(endValue)}</Text>
            </Group>
          </Stack>
        </MediaQuery>

        <CloseButton
          ml="auto"
          mr={isMobile ? "xs" : "xl"}
          variant="light"
          size="xl"
          onClick={closePlayer}
        />
      </Group>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        autoPlay
      />
    </Card>
  );
};
