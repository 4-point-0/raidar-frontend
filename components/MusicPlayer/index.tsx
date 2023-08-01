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
import { useState } from "react";
import {
  BsFillForwardFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill,
  BsPlay,
  BsPlayBtnFill,
  BsPlayCircle,
} from "react-icons/bs";

export const MusicPlayer = () => {
  const { song, setSong } = userPlayerContext();

  const [value, setValue] = useState(50);
  const [endValue, setEndValue] = useState(50);

  const closePlayer = () => {
    // TODO: Stop playing
    setSong(null);
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

              <ActionIcon variant="transparent" size="xl">
                <BsPlay size={30} />
              </ActionIcon>
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <ActionIcon variant="transparent" size="xl">
                  <BsFillSkipForwardFill size={30} />
                </ActionIcon>
              </MediaQuery>
            </Group>
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Slider
                value={value}
                onChange={setValue}
                onChangeEnd={setEndValue}
              />
            </MediaQuery>
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
    </Card>
  );
};
