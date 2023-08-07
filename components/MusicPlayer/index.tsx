import { userPlayerContext } from "@/context/PlayerContext";
import {
  ActionIcon,
  Box,
  Card,
  CloseButton,
  Grid,
  Group,
  Image,
  MediaQuery,
  Progress,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { useState, useRef, useEffect } from "react";
import {
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsPause,
  BsPlay,
} from "react-icons/bs";
import ImageWithBlurredShadow from "../ImageBlurShadow";

export const MusicPlayer = () => {
  const { song, setSong } = userPlayerContext();

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
    setIsPlaying(false);
    setSong(null);
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
      <Group>
        <ImageWithBlurredShadow
          src={song?.art.url ?? ""}
          alt={song?.title ?? ""}
          height={80}
          width={80}
        />

        <Stack ml="md" spacing="xs">
          <Text fz="lg" fw={600}>
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
          <Stack ml="auto" mr="auto" sx={{ width: "60%" }}>
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
          mr="xl"
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
