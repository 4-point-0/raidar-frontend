import React from "react";
import { List, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { rem, ThemeIcon } from "@mantine/core";

interface SongAttributeItem {
  label?: string;
  value?: string | number | string[] | number[] | boolean | null;
  icon?: any;
}

interface SongAttributeProps {
  children?: React.ReactNode; // Add children prop here
  songAttributes: SongAttributeItem[];
}

const SongAttribute = ({ songAttributes }: SongAttributeProps) => {
  return (
    <List mt={30} spacing="sm" size="sm" sx={{ listStyle: "none" }}>
      {songAttributes.map((songAttribute, index) => (
        <List.Item key={index}>
          <Text>
            <ThemeIcon size={30} radius="xl" color="red" mr={10}>
              {/* <IconCheck size={rem(12)} stroke={1.5} /> */}
              {songAttribute.icon}
            </ThemeIcon>
            <b>{songAttribute.label}</b>: {songAttribute.value}
          </Text>
        </List.Item>
      ))}
    </List>
  );
};

export default SongAttribute;
