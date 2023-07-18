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
} from "@mantine/core";

import { Wallet } from "tabler-icons-react";
import { useFindUser } from "@/hooks/useFindUser";

export const UserProfile = () => {
  const { user } = useFindUser();

  return (
    <Container>
      <Stack>
        <Image
          height={160}
          width={160}
          radius="xl"
          src={"/images/avatar-placeholder.png"}
          alt=""
        />

        <Title order={3}>{`${user?.first_name} ${user?.last_name}`}</Title>

        <Box>
          <Title order={5}>Account Type</Title>
          <Text>{user?.roles[0]}</Text>
        </Box>

        <Box>
          <Title order={5}>Email address</Title>
          <Text>{user?.email}</Text>
        </Box>

        <Box>
          <Title order={5}>Wallet ID</Title>
          <Text>
            {user?.wallet_address
              ? user?.wallet_address
              : "User needs to connect his wallet"}
          </Text>
        </Box>

        <Group>
          {!user?.wallet_address ? (
            <Button leftIcon={<Wallet size={14} />} onClick={() => {}}>
              Connect Wallet
            </Button>
          ) : null}
        </Group>
      </Stack>
    </Container>
  );
};

export default UserProfile;
