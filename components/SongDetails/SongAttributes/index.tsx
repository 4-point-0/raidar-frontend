import React from "react";
import {
  Box,
  Button,
  Drawer,
  Group,
  SimpleGrid,
  Text,
  createStyles,
} from "@mantine/core";
import { ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colors.red[5],
    ...theme.fn.hover({
      backgroundColor: theme.colors.red[8],
    }),
  },
}));
interface SongAttributeItem {
  label?: string;
  value?: string | number | string[] | number[] | boolean | null;
  icon?: any;
}

interface SongAttributeProps {
  children?: React.ReactNode;
  songAttributes: SongAttributeItem[];
}

const SongAttribute = ({ songAttributes }: SongAttributeProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Song details"
        overlayProps={{ opacity: 0.5, blur: 4 }}
        position="bottom"
      >
        <SimpleGrid
          cols={5}
          spacing="xl"
          mt={20}
          breakpoints={[{ maxWidth: "md", cols: 1 }]}
        >
          {songAttributes.map((songAttribute, index) => (
            <Box
              key={index}
              p="md"
              sx={(theme) => ({
                ":hover": {
                  cursor: "pointer",
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[2],
                  borderRadius: theme.radius.md,
                  transition: "all 0.2s ease-in-out",
                },
                ":hover .song-image": {
                  filter: "brightness(1.3)",
                  transition: "all 0.2s ease-in-out",
                },
                ":hover .play-overlay": {
                  display: "block",
                },
              })}
            >
              <Group>
                <ThemeIcon size={30} radius="xl" color="red" mr={5}>
                  {songAttribute.icon}
                </ThemeIcon>
                <Text>
                  <b>{songAttribute.label}</b>:
                </Text>
                <Text c="dimmed">{songAttribute.value}</Text>
              </Group>
            </Box>
          ))}
        </SimpleGrid>
      </Drawer>

      <Group position="center">
        <Button className={classes.button} onClick={open}>
          Song Details
        </Button>
      </Group>
    </>
  );
};

export default SongAttribute;
