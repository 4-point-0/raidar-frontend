import { AppLayout } from "@/components/layout/AppLayout";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

import { PlayerContextProvider } from "@/context/PlayerContext";
import { WalletSelectorContextProvider } from "@/context/WalletSelectorContext";
import { raidarTheme } from "@/styles/theme";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { UserContextProvider } from "../context/UserContext";

import { AccountProvider } from "@/context/AccountContext";
import "@near-wallet-selector/modal-ui/styles.css";

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

  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Raidar - by Berklee</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          property="twitter:image"
          content="https://app.raidar.us/images/berklee-logo.svg"
        ></meta>

        <meta
          property="og:image"
          content="https://app.raidar.us/images/berklee-logo.svg"
        ></meta>

        <meta property="twitter:title" content="Raidar"></meta>

        <meta property="og:title" content="Raidar"></meta>

        <meta property="twitter:card" content="summary"></meta>

        <meta
          property="twitter:description"
          content="Explore and purchase licenses for a diverse selection of songs from talented artists in our marketplace, all powered by the convenience and security of cryptocurrencies."
        ></meta>

        <meta
          property="description"
          content="Explore and purchase licenses for a diverse selection of songs from talented artists in our marketplace, all powered by the convenience and security of cryptocurrencies."
        />

        <meta
          property="og:description"
          content="Explore and purchase licenses for a diverse selection of songs from talented artists in our marketplace, all powered by the convenience and security of cryptocurrencies."
        />
      </Head>

      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <WalletSelectorContextProvider>
            <AccountProvider>
              <UserContextProvider>
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
              </UserContextProvider>
            </AccountProvider>
          </WalletSelectorContextProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
