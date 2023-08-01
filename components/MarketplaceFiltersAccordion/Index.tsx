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
  const [selectedFilters, setSelectedFilters] = useState({
    title: "",
    artist: "",
    minLength: "",
    maxLength: "",
    genre: "",
    mood: "",
    tags: "",
    minBpm: "",
    maxBpm: "",
    instrumental: null,
    musicalKey: "",
  });

  const handleFilterButtonClick = () => {
    const filters = {
      title: selectedFilters.title || "",
      artist: selectedFilters.artist || "",
      minLength: selectedFilters.minLength || null,
      maxLength: selectedFilters.maxLength || null,
      genre: selectedFilters.genre || "",
      mood: selectedFilters.mood || "",
      tags: selectedFilters.tags || "",
      minBpm: selectedFilters.minBpm || "",
      maxBpm: selectedFilters.maxBpm || "",
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

    console.log(
      `http://raidardev.eba-pgpaxsx2.eu-central-1.elasticbeanstalk.com/api/v1/marketplace/songs?${filterQueryString}`
    );

    // fetch(
    //   `http://raidardev.eba-pgpaxsx2.eu-central-1.elasticbeanstalk.com/api/v1/marketplace/songs?${filterQueryString}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${session.data?.token}`,
    //       accept: "application/json",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("song", data);
    //     onUpdatedResults(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
  };

  // const { data: song } = useMarketplaceControllerFindAll({
  //   queryParams: {
  //     title: "Sunset Melodies" as string,
  //   },
  // });

  console.log(selectedFilters.title);

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
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ]}
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
                radius="sm"
                placeholder="Musical Key"
                data={musicalKeys}
                value={selectedFilters.musicalKey}
                onChange={(event) => {
                  setSelectedFilters({
                    ...selectedFilters,
                    musicalKey: event?.data.value,
                  });
                }}
              />
            </Grid.Col>
            {/* <Grid.Col span={4}>
              {" "}
              <Select
                placeholder="Select song title"
                radius="sm"
                data={[{ value: "Sunset Melodies", label: "Sunset Melodies" }]}
                value={selectedFilters.title}
                onChange={(value) =>
                  setSelectedFilters({ ...selectedFilters, title: value })
                }
              />
            </Grid.Col> */}
          </Grid>
          <Grid mt="sm">
            <Grid.Col span={6}>
              <Text>BPM</Text>
              <RangeSlider
                color="red"
                defaultValue={[20, 80]}
                marks={[
                  { value: 20, label: "20%" },
                  { value: 50, label: "50%" },
                  { value: 80, label: "80%" },
                ]}
              />
            </Grid.Col>
          </Grid>
          <Button color="red" mt="xl" onClick={() => handleFilterButtonClick()}>
            Apply Filters
          </Button>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default MarketplaceFiltersAccordion;
