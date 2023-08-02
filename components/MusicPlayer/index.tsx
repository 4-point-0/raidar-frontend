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
  BsFillForwardFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsPause, // Changed to pause icon
  BsPlay,
  BsPlayBtnFill,
  BsPlayCircle,
} from "react-icons/bs";

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
      <Grid sx={{ width: "100%" }}>
        <Grid.Col span={3}>
          <Group>
            <Image
              sx={{
                borderRadius: "8px",
              }}
              src={song?.art.url}
              height={80}
              width={80}
            />

            <Stack spacing="xs">
              <Text fz="lg" fw={600}>
                {song?.title}
              </Text>
              <Text fz="sm">{song?.pka}</Text>
            </Stack>
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Group position="center">
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <ActionIcon variant="transparent" size="xl">
                  <BsFillSkipBackwardFill size={30} />
                </ActionIcon>
              </MediaQuery>

              <ActionIcon
                variant="transparent"
                size="xl"
                onClick={handlePlayPause}
              >
                {isPlaying ? <BsPause size={30} /> : <BsPlay size={30} />}
              </ActionIcon>

              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <ActionIcon variant="transparent" size="xl">
                  <BsFillSkipForwardFill size={30} />
                </ActionIcon>
              </MediaQuery>
            </Group>

            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Slider
                label={(value) => formatTime(value)}
                value={value}
                onChange={handleSeek}
                max={endValue}
              />
            </MediaQuery>
            <Group position="apart">
              <Text>{formatTime(value)}</Text>
              <Text>{formatTime(endValue)}</Text>
            </Group>
          </Stack>
        </Grid.Col>
        <Grid.Col span={3}>
          <Group position="right">
            <ActionIcon variant="transparent" size="xl" onClick={closePlayer}>
              <CloseButton size={30} />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        autoPlay
      />
    </Card>
  );
};
