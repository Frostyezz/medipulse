import { useCallback, useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Inter } from "@next/font/google";
import RouterTransition from "@/common/components/RouterTransition";
import "../services/i18next";
import { Provider } from "react-redux";
import { store } from "@/services/redux/store";
import { ApolloProvider } from "@apollo/client";
import client from "@/services/apollo";
import { Notifications } from "@mantine/notifications";
import CurrentUserProvider from "@/common/components/CurrentUserProvider";
import Footer from "@/common/components/Footer/Footer";
import "animate.css";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = useCallback(
    (value?: ColorScheme) => {
      setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    },
    [colorScheme]
  );

  return (
    <>
      <Head>
        <title>MediPulse</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                fontFamily: inter.style.fontFamily,
                headings: { fontFamily: inter.style.fontFamily },
                colorScheme,
              }}
            >
              <ModalsProvider>
                <CurrentUserProvider>
                  <Notifications />
                  <RouterTransition />
                  <Component {...pageProps} />
                  <Footer />
                </CurrentUserProvider>
              </ModalsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}
