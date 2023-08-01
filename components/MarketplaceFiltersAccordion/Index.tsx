import {
  Accordion,
  Grid,
  Select,
  rem,
  createStyles,
  Button,
  Input,
  RangeSlider,
  Title,
  Text,
  Slider,
} from "@mantine/core";
import { useState } from "react";
import { useMarketplaceControllerFindAll } from "../../services/api/components";
import { useSession } from "next-auth/react";
import { musicalKeys } from "../../datasets/filters/musical-keys";

const useStyles = createStyles((theme) => ({
  item: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export const MarketplaceFiltersAccordion = ({ onUpdatedResults }: any) => {
  const { classes } = useStyles();
  const session = useSession();

  const initialState = {
    title: "",
    artist: "",
    minLength: "",
    maxLength: "",
    genre: "",
    mood: "",
    tags: "",
    minBpm: 0,
    maxBpm: 0,
    instrumental: "",
    musicalKey: "",
  };

  const [selectedFilters, setSelectedFilters] = useState(initialState);

  const handleFilterButtonClick = () => {
    const filters = {
      title: selectedFilters.title || "",
      artist: selectedFilters.artist || "",
      minLength: selectedFilters.minLength || null,
      maxLength: selectedFilters.maxLength || null,
      genre: selectedFilters.genre || "",
      mood: selectedFilters.mood || "",
      tags: selectedFilters.tags || "",
      minBpm: selectedFilters.minBpm || 0,
      maxBpm: selectedFilters.maxBpm || 0,
      instrumental: selectedFilters.instrumental || "",
      musical_key: selectedFilters.musicalKey || "",
    };

    const filterParams: string[] = [];
    for (const key in filters) {
      if (filters[key]) {
        filterParams.push(`${key}=${encodeURIComponent(filters[key])}`);
      }
    }

    const filterQueryString = filterParams.join("&");

    fetch(
      `http://raidardev.eba-pgpaxsx2.eu-central-1.elasticbeanstalk.com/api/v1/marketplace/songs?${filterQueryString}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.data?.token}`,
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        onUpdatedResults(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <Accordion>
      <Accordion.Item className={classes.item} value="reset-password">
        <Accordion.Control>Filter the content</Accordion.Control>
        <Accordion.Panel>
          <Grid>
            <Grid.Col span={4}>
              {" "}
              <Input
                placeholder="Song title"
                radius="sm"
                value={selectedFilters.title}
                onChange={(event) =>
                  setSelectedFilters({
                    ...selectedFilters,
                    title: event.target.value,
                  })
                }
              />
            </Grid.Col>
            <Grid.Col span={4}>
              {" "}
              <Input
                placeholder="Song Artist"
                radius="sm"
                value={selectedFilters.artist}
                onChange={(event) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    artist: event.target.value,
                  });
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              {" "}
              <Input
                placeholder="Song Genre"
                radius="sm"
                value={selectedFilters.genre}
                onChange={(event) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    genre: event?.target.value,
                  });
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                radius="sm"
                placeholder="Instrumental"
                data={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
                value={selectedFilters.instrumental}
                onChange={(event) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    instrumental: event || "",
                  });
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Input
                placeholder="Mood"
                radius="sm"
                value={selectedFilters.mood}
                onChange={(event) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    mood: event.target.value,
                  });
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Input
                placeholder="Tags"
                radius="sm"
                value={selectedFilters.tags}
                onChange={(event) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    tags: event.target.value,
                  });
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                placeholder="Select musical key"
                radius="sm"
                data={musicalKeys}
                value={selectedFilters.musicalKey}
                onChange={(event) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    musicalKey: event || "",
                  });
                }}
              />
            </Grid.Col>
          </Grid>
          <Grid mt="sm">
            <Grid.Col span={6}>
              <Text>BPM</Text>
              <Slider
                thumbSize={16}
                defaultValue={20}
                max={200}
                value={selectedFilters.maxBpm}
                onChange={(event) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    maxBpm: event,
                  });
                }}
              />
            </Grid.Col>
          </Grid>
          <Button color="red" mt="xl" onClick={() => handleFilterButtonClick()}>
            Apply Filters
          </Button>
          <Button
            ml="5px"
            color="dark"
            onClick={() => setSelectedFilters(initialState)}
          >
            Reset Filters
          </Button>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default MarketplaceFiltersAccordion;
