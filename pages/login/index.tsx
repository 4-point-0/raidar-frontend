import {
  Box,
  Button,
  Container,
  Image,
  MediaQuery,
  Stack,
  Title,
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
          // boxShadow: "-2px 0px 17px -3px rgba(0,0,0,0.75)",
          borderRadius: "30px",
          padding: "1%",
          backgroundColor: "white",
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
                src="images/login-image.jpeg"
                width={200}
                alt="Login Images"
              />
            </Box>
          </Stack>
        </MediaQuery>

        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Stack align={"center"}>
            <Box sx={{ width: "50vw" }}>
              <Image
                mx="auto"
                width={400}
                fit="contain"
                src="images/login-image.jpeg"
              />
            </Box>

            <Button
              // loading={loading}
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
