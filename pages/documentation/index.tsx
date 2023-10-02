import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
  useMantineTheme,
  Container,
  Center,
  Title,
  Box,
} from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import classes from "./documentation.module.css";

const documents = [
  {
    title: "edu-controlled-comp-flowchart.pdf",
    icon: IconFile,
    color: "red",
    href: "/documentation/edu-controlled-comp-flowchart.pdf",
  },
  {
    title: "sync-license-example.pdf",
    icon: IconFile,
    color: "red",
    href: "/documentation/sync-license-example.pdf",
  },
  {
    title: "sync-license-explainer.pdf",
    icon: IconFile,
    color: "red",
    href: "/documentation/sync-license-explainer.pdf",
  },
  {
    title: "sync-license-template.pdf",
    icon: IconFile,
    color: "red",
    href: "/documentation/sync-license-template.pdf",
  },
  {
    title: "terms-explainer.pdf",
    icon: IconFile,
    color: "red",
    href: "/documentation/terms-explainer.pdf",
  },
  {
    title: "wfh-explainer.pdf",
    icon: IconFile,
    color: "red",
    href: "/documentation/wfh-explainer.pdf",
  },
  {
    title: "wfh-template.pdf",
    icon: IconFile,
    color: "red",
    href: "/documentation/wfh-template.pdf",
  },
];

export const Documentation = () => {
  const theme = useMantineTheme();

  const items = documents.map((document, index) => (
    <UnstyledButton key={index} className={classes.item} mt={"25%"}>
      <Anchor<"a">
        href={document.href}
        target="_blank"
        rel="noreferrer"
        c="dimmed"
      >
        <document.icon color={theme.colors.red[5]} size="40px" />
        <Text size="md" mt={7}>
          {document.title}
        </Text>
      </Anchor>
    </UnstyledButton>
  ));

  return (
    <Container size="xl">
      <Card radius="md" className={classes.card} mt={"1%"}>
        <Center>
          <Title className={classes.title}>Documentation</Title>
        </Center>
        <Center>
          <Text c="dimmed" className={classes.description} ta="center">
            Welcome to our comprehensive documentation hub, your go-to resource
            for mastering the art of using our platform.
          </Text>
        </Center>
        <SimpleGrid cols={3}>{items}</SimpleGrid>
      </Card>
    </Container>
  );
};

export default Documentation;
