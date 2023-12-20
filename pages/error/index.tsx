import {
  Container,
  Image,
  Title,
  Button,
  Text,
  Center,
  useMantineTheme,
} from "@mantine/core";
import classes from "./Error.module.css";
import Link from "next/link";

export const ErrorPage = () => {
  const theme = useMantineTheme();

  return (
    <Container className={classes.root} mt="xl">
      <Title className={classes.title} mt={"10%"}>
        Sorry! Something went wrong, we are unable to proceed with payment
      </Title>

      <Center>
        <Image src={"./images/error-payment.png"} width={300} />
      </Center>

      <Text
        c="dimmed"
        size="lg"
        ta="center"
        className={classes.description}
        mt={"xl"}
      >
        We regret to inform you that your payment for the song license was
        unsuccessful. The acquisition of rights to the music has not been
        completed at this time. Please review your payment details and try again
        to secure your desired song license from our talented artists. If you
        continue to experience issues, feel free to contact our support team for
        assistance. We appreciate your interest and hope to assist you in
        successfully obtaining the music license you desire for your creative
        projects.
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

export default ErrorPage;
