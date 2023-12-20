import {
  Container,
  SimpleGrid,
  Image,
  Title,
  Button,
  Text,
  Group,
  Center,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import classes from "./Success.module.css";
import Link from "next/link";

export const SuccessPage = () => {
  const theme = useMantineTheme();

  return (
    <Container className={classes.root} mt="xl">
      <Title className={classes.title} mt={"10%"}>
        Congratulations! You've Secured a Song License
      </Title>

      <Title className={classes.subtitle} mt="xl" color={theme.colors.red[6]}>
        Sad City
      </Title>

      <Center>
        <Image src={"./images/bought-song.png"} width={300} />
      </Center>

      <Text
        c="dimmed"
        size="lg"
        ta="center"
        className={classes.description}
        mt={"xl"}
      >
        You've just acquired the rights to an incredible piece of music from our
        talented artists. Your song license is now in your possession, and the
        details are readily available in your{" "}
        <Link
          href={"/contracts"}
          style={{ textDecoration: "none", color: theme.colors.red[6] }}
        >
          Contracts Page
        </Link>
        . This document outlines the terms and conditions, ensuring that you can
        confidently and legally use this music in your creative endeavors. Enjoy
        your new musical asset, and may it bring inspiration to your projects!
      </Text>
      <Center>
        <Button
          href={`/marketplace`}
          fw={700}
          size="md"
          component={Link}
          mt="xl"
          style={{
            backgroundColor: "transparent",
            color: theme.colors.red[6],
            textAlign: "left",
          }}
        >
          Take me back to Marketplace
        </Button>
      </Center>
    </Container>
  );
};

export default SuccessPage;
