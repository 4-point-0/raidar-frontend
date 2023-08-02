import Head from "next/head";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalsProvider } from "@mantine/modals";
import type { AppProps } from "next/app";
import { AppLayout } from "@/components/layout/AppLayout";

import { Notifications } from "@mantine/notifications";
import { WalletSelectorContextProvider } from "@/context/WalletSelectorContext";
import { UserContextProvider } from "../context/UserContext";
import { PlayerContextProvider } from "@/context/PlayerContext";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { raidarTheme } from "@/styles/theme";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const preferredColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const router = useRouter();

  const queryClient = new QueryClient();

  const isAdminPages = router.route.startsWith("/artist");
  const isUserPages = router.route.startsWith("/user");

  return (
    <>
      <Head>
        <title>Raidar - by Berklee</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {/* <WalletSelectorContextProvider> */}
          {/* <UserContextProvider> */}
          <PlayerContextProvider>
            <ColorSchemeProvider
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            >
              <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ ...raidarTheme, colorScheme }}
              >
                <ModalsProvider>
                  <Notifications />
                  <AppLayout>
                    <Component {...pageProps} />
                  </AppLayout>
                </ModalsProvider>
              </MantineProvider>
            </ColorSchemeProvider>
          </PlayerContextProvider>
          {/* </UserContextProvider> */}
          {/* </WalletSelectorContextProvider> */}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
