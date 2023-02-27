import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Inter } from "@next/font/google";
import RouterTransition from "@/common/components/RouterTransition";
import "../services/i18next";
import { Provider } from "react-redux";
import { store } from "@/services/redux/store";
import { ApolloProvider } from "@apollo/client";
import client from "@/services/apollo";
import { NotificationsProvider } from "@mantine/notifications";
import CurrentUserProvider from "@/common/components/CurrentUserProvider";

const inter = Inter({ subsets: ["latin"] });

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

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
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              fontFamily: inter.style.fontFamily,
              headings: { fontFamily: inter.style.fontFamily },
              colorScheme: "light",
            }}
          >
            <NotificationsProvider>
              <CurrentUserProvider>
                <RouterTransition />
                <Component {...pageProps} />
              </CurrentUserProvider>
            </NotificationsProvider>
          </MantineProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}
