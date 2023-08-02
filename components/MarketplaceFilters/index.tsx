import { useDisclosure } from "@mantine/hooks";
import { Drawer, Group, Button, Input, Select, Slider } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { musicalKeys } from "@/datasets/filters/musical-keys";
import { intrumentalKeys } from "@/datasets/filters/intrumental-keys";

interface FiltersProps {
  title: string;
  artist: string;
  genre: string;
  mood: string;
  tags: string;
  minBpm: number;
  maxBpm: number;
  instrumental: string;
  musical_key: string;
}

export const MarketplaceFilters = ({ onUpdatedResults }: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const session = useSession();

  const initialState = {
    title: "",
    artist: "",
    genre: "",
    mood: "",
    tags: "",
    minBpm: 0,
    maxBpm: 0,
    instrumental: "",
    musical_key: "",
  };

  const [selectedFilters, setSelectedFilters] = useState(initialState);

  const handleFilterButtonClick = () => {
    const filters: FiltersProps = {
      title: selectedFilters.title || "",
      artist: selectedFilters.artist || "",
      genre: selectedFilters.genre || "",
      mood: selectedFilters.mood || "",
      tags: selectedFilters.tags || "",
      minBpm: selectedFilters.minBpm || 0,
      maxBpm: selectedFilters.maxBpm || 0,
      instrumental: selectedFilters.instrumental || "",
      musical_key: selectedFilters.musical_key || "",
    };

    const filterParams: string[] = [];
    for (const key in filters) {
      if ((filters as any)[key]) {
        filterParams.push(
          `${key}=${encodeURIComponent((filters as any)[key])}`
        );
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
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Filter Songs"
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <Input.Wrapper
          mt="sm"
          label="Title"
          required
          maw={320}
          mx="auto"
          withAsterisk={false}
        >
          <Input
            radius="sm"
            value={selectedFilters.title}
            onChange={(event) =>
              setSelectedFilters({
                ...selectedFilters,
                title: event.target.value,
              })
            }
          />
        </Input.Wrapper>

        <Input.Wrapper
          mt="sm"
          label="Artist"
          required
          maw={320}
          mx="auto"
          withAsterisk={false}
        >
          <Input
            radius="sm"
            value={selectedFilters.artist}
            onChange={(event) => {
              setSelectedFilters({
                ...selectedFilters,
                artist: event.target.value,
              });
            }}
          />
        </Input.Wrapper>

        <Input.Wrapper
          mt="sm"
          label="Genre"
          required
          maw={320}
          mx="auto"
          withAsterisk={false}
        >
          <Input
            radius="sm"
            value={selectedFilters.genre}
            onChange={(event) => {
              setSelectedFilters({
                ...selectedFilters,
                genre: event?.target.value,
              });
            }}
          />
        </Input.Wrapper>

        <Input.Wrapper
          mt="sm"
          label="Instrumental"
          required
          maw={320}
          mx="auto"
          withAsterisk={false}
        >
          <Select
            radius="sm"
            data={intrumentalKeys}
            value={selectedFilters.instrumental}
            onChange={(event) => {
              setSelectedFilters({
                ...selectedFilters,
                instrumental: event || "",
              });
            }}
          />
        </Input.Wrapper>

        <Input.Wrapper
          mt="sm"
          label="Mood"
          required
          maw={320}
          mx="auto"
          withAsterisk={false}
        >
          <Input
            radius="sm"
            value={selectedFilters.mood}
            onChange={(event) => {
              setSelectedFilters({
                ...selectedFilters,
                mood: event.target.value,
              });
            }}
          />
        </Input.Wrapper>

        <Input.Wrapper
          mt="sm"
          label="Tags"
          required
          maw={320}
          mx="auto"
          withAsterisk={false}
        >
          <Input
            radius="sm"
            value={selectedFilters.tags}
            onChange={(event) => {
              setSelectedFilters({
                ...selectedFilters,
                tags: event.target.value,
              });
            }}
          />
        </Input.Wrapper>

        <Input.Wrapper
          mt="sm"
          label="Musical Key"
          required
          maw={320}
          mx="auto"
          withAsterisk={false}
        >
          <Select
            radius="sm"
            data={musicalKeys}
            value={selectedFilters.musical_key}
            onChange={(event) => {
              setSelectedFilters({
                ...selectedFilters,
                musical_key: event || "",
              });
            }}
          />
        </Input.Wrapper>

        <Input.Wrapper
          mt="md"
          label="BPM"
          required
          maw={320}
          mx="auto"
          withAsterisk={false}
        >
          <Slider
            mt="sm"
            thumbSize={16}
            defaultValue={20}
            max={200}
            value={selectedFilters.maxBpm}
            color="red"
            onChange={(event) => {
              setSelectedFilters({
                ...selectedFilters,
                maxBpm: event,
              });
            }}
          />
        </Input.Wrapper>

        <Input.Wrapper
          mt="sm"
          required
          maw={320}
          mx="auto"
          withAsterisk={false}
        >
          <Button
            color="red"
            mt="xl"
            onClick={() => {
              handleFilterButtonClick();
              close();
            }}
          >
            Apply Filters
          </Button>
          <Button
            ml="5px"
            color="dark"
            onClick={() => setSelectedFilters(initialState)}
          >
            Reset Filters
          </Button>
        </Input.Wrapper>
      </Drawer>

      <Group position="center">
        <Button mt={20} color="red" onClick={open}>
          Filter songs
        </Button>
      </Group>
    </>
  );
};
