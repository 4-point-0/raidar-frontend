import {
  Box,
  Button,
  Container,
  Image,
  MediaQuery,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";

import { ClientSafeProvider, signIn } from "next-auth/react";

import { getProviders } from "next-auth/react";

import { redirectIfActiveSession } from "@/utils/auth";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { redirect } = await redirectIfActiveSession(ctx);

  if (redirect) {
    return { redirect };
  }

  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const callbackUrl = (router.query.callbackUrl as string) || "/marketplace";

  const handleSignIn = (provider?: ClientSafeProvider) => {
    return () => {
      signIn(provider?.id, {
        callbackUrl,
        redirect: true,
      });
    };
  };

  return (
    <Container sx={{}}>
      <Container
        mt="20%"
        sx={{
          borderRadius: "30px",
          padding: "1%",
          border: "none",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Stack align={"center"}>
            <Box
              sx={{
                width: "100vw",
              }}
            >
              <Image
                mx="auto"
                src="images/login-image2.png"
                width={300}
                alt="Login Image"
              />
            </Box>

            <Button
              mt="xl"
              color={theme.colors.red[5]}
              variant="filled"
              radius="xl"
              size="md"
              onClick={handleSignIn(providers?.google)}
            >
              Connect to Raidar with Google
              <Box
                ml={10}
                sx={{
                  width: "50",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "2px",
                }}
              >
                <FcGoogle style={{ width: "22px", height: "22px" }} />
              </Box>
            </Button>
            <Box mt={20} sx={{ textAlign: "center" }}>
              <Text mb={15} c="dimmed">
                Powered By
              </Text>
              <Image
                mx="auto"
                mb={20}
                src="images/berklee-college.png"
                width={150}
              />
            </Box>
          </Stack>
        </MediaQuery>

        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Stack align={"center"}>
            <Box sx={{ width: "50vw" }}>
              <Image
                mx="auto"
                width={600}
                fit="contain"
                src="images/login-image2.png"
              />
            </Box>

            <Button
              mt="xl"
              color="red"
              variant="filled"
              radius="xl"
              size="md"
              onClick={handleSignIn(providers?.google)}
            >
              Connect to Raidar with Google
              <Box
                ml={10}
                sx={{
                  width: "50",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "2px",
                }}
              >
                <FcGoogle style={{ width: "22px", height: "22px" }} />
              </Box>
            </Button>
            <Box mt={20} sx={{ textAlign: "center" }}>
              <Text mb={15} c="dimmed">
                Powered By
              </Text>
              <Image
                mx="auto"
                mb={20}
                src="images/berklee-college.png"
                width={150}
              />
            </Box>
          </Stack>
        </MediaQuery>
      </Container>
    </Container>
  );
};

export default Login;
