import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
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
import "animate.css";
import Footer from "@/common/components/Footer/Footer";

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
            <ModalsProvider>
              <CurrentUserProvider>
                <Notifications />
                <RouterTransition />
                <Component {...pageProps} />
                <Footer />
              </CurrentUserProvider>
            </ModalsProvider>
          </MantineProvider>
        </Provider>
      </ApolloProvider>
    </>
  );
}
