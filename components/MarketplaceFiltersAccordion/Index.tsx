import { Accordion, Grid, Select, rem, createStyles } from "@mantine/core";
import React from "react";

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

export const MarketplaceFiltersAccordion = () => {
  const { classes } = useStyles();

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
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default MarketplaceFiltersAccordion;
