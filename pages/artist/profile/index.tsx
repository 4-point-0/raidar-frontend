import React from "react";
import {
  Button,
  Container,
  Stack,
  Image,
  Title,
  Box,
  Group,
  Text,
  Card,
  Avatar,
  createStyles,
  rem,
} from "@mantine/core";

import {
  Wallet,
  Mail,
  BrandInstagram,
  BrandFacebook,
  BrandLinkedin,
} from "tabler-icons-react";
import { useFindUser } from "@/hooks/useFindUser";
import WalletConnectButton from "@/components/WalletConnectButton";

import { useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: "#F8F8FF",
    width: "50%",
    margin: "auto",
  },

  avatar: {
    border: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

export const ArtistProfile = () => {
  const { user } = useFindUser();
  const { classes } = useStyles();

  const { data: session } = useSession();

  return (
    <Card
      withBorder
      padding="xl"
      radius="xl"
      className={classes.card}
      shadow="sm"
    >
      <Card.Section
        sx={{
          backgroundImage: `url("/images/studio.jpeg")`,
          height: 250,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <Avatar
        src={
          session?.user?.image
            ? session?.user?.image
            : "/images/avatar-placeholder.png"
        }
        size={150}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" size={30} fw={700} mt="sm">
        {`${user?.first_name} ${user?.last_name}`}
      </Text>
      <Text ta="center" size={20} c="dimmed">
        {user?.roles[0].toUpperCase()}
      </Text>
      <Title ta="center" fz="md" mt={20}>
        Email
      </Title>
      <Text ta="center" fz="md" c="dimmed">
        {session?.user?.email}
      </Text>

      <Title ta="center" fz="md" mt={15}>
        Wallet Address
      </Title>

      <Text ta="center" fz="md" c="dimmed">
        {user?.wallet_address
          ? user?.wallet_address
          : "User needs to connect his wallet"}
      </Text>

      <Box ta="center" mt="xl">
        <WalletConnectButton />
      </Box>

      <Box ta="center" mt="xl">
        <BrandFacebook size={30} />
        <BrandInstagram size={30} />
        <BrandLinkedin size={30} />
      </Box>
    </Card>
  );
};

export default ArtistProfile;
