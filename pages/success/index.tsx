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
import { useEffect } from "react";
import createPDF from "../../utils/createPDF";
import { fetchContractControllerFindOne } from "../../services/api/raidar/raidarComponents";

export const SuccessPage = () => {
  const theme = useMantineTheme();

  const signatureDataUrl = JSON.parse(
    localStorage.getItem("signature") || "null"
  );
  const userData = JSON.parse(localStorage.getItem("userData") || "null");
  const descriptionOfUse = JSON.parse(
    localStorage.getItem("descriptionOfUse") || "null"
  );
  const selectedSong = JSON.parse(
    localStorage.getItem("selectedSong") || "null"
  );
  const { data } = JSON.parse(localStorage.getItem("contractData") || "null");

  const handleCreatePdf = async () => {
    try {
      // Make sure all required data is available
      if (!selectedSong || !userData || !signatureDataUrl) {
        throw new Error("Required data is missing");
      }

      if (!data || !data.pdfUrl) {
        throw new Error("PDF URL is missing");
      }

      await createPDF(
        selectedSong.id, // songId
        undefined, // title
        undefined, // pka
        undefined, // length
        undefined, // price
        descriptionOfUse, // descriptionOfUse
        userData, // userMail
        signatureDataUrl, // signatureDataUrl
        data.pdfUrl, // pdfLink
        true // isBought
      );

      // TODO: remove items from localstorage
      // localStorage.removeItem("signature");
      // localStorage.removeItem("descriptionOfUse");
      // localStorage.removeItem("selectedSong");
      // localStorage.removeItem("contractData");
    } catch (err: any) {
      console.error("Error in handleCreatePdf:", err.message);
    }
  };

  useEffect(() => {
    handleCreatePdf();
  }, []);

  return (
    <Container className={classes.root} mt="xl">
      <Title className={classes.title} mt={"10%"}>
        Congratulations! You've Secured a Song License
      </Title>

      <Title className={classes.subtitle} mt="xl" color={theme.colors.red[6]}>
        {selectedSong.title}
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
