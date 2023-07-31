import {
  Accordion,
  Grid,
  Select,
  rem,
  createStyles,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { useMarketplaceControllerFindAll } from "../../services/api/components";
import { useSession } from "next-auth/react";

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
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterButtonClick = ({ title }: any) => {
    // const title = "Sunset Melodies";
    // const filters = selectedFilters; // Replace this with your actual filters

    // Make the API request using the title and filters
    fetch(
      `http://raidardev.eba-pgpaxsx2.eu-central-1.elasticbeanstalk.com/api/v1/marketplace/songs?title=${encodeURIComponent(
        title
      )}`,
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
        console.log("song", data);
        onUpdatedResults(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // const { data: song } = useMarketplaceControllerFindAll({
  //   queryParams: {
  //     title: "Sunset Melodies" as string,
  //   },
  // });

  return (
    <Accordion>
      <Accordion.Item className={classes.item} value="reset-password">
        <Accordion.Control>Filter the content</Accordion.Control>
        <Accordion.Panel>
          <Grid>
            <Grid.Col span={4}>
              {" "}
              <Select
                label="Select Language"
                data={[
                  { value: "react", label: "React" },
                  { value: "ng", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "vue", label: "Vue" },
                ]}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              {" "}
              <Select
                label="Select Genre"
                data={[
                  { value: "react", label: "React" },
                  { value: "ng", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "vue", label: "Vue" },
                ]}
              />
            </Grid.Col>
            <Grid.Col span={4}>Bpm</Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4}>
              <Select
                label="Select Language"
                data={[
                  { value: "react", label: "React" },
                  { value: "ng", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "vue", label: "Vue" },
                ]}
              />
            </Grid.Col>
            <Grid.Col span={4}>2</Grid.Col>
            <Grid.Col span={4}>3</Grid.Col>
          </Grid>
          <Button
            onClick={() =>
              handleFilterButtonClick({ title: "Sunset Melodies" })
            }
          >
            Apply Filters
          </Button>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default MarketplaceFiltersAccordion;
