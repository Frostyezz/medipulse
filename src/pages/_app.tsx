import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Inter } from "@next/font/google";
import RouterTransition from "@/common/components/RouterTransition";
import "../services/i18next";
import { Provider } from "react-redux";
import { store } from "@/services/redux/store";

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
      <Provider store={store}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: inter.style.fontFamily,
            colorScheme: "light",
          }}
        >
          <RouterTransition />
          <Component {...pageProps} />
        </MantineProvider>
      </Provider>
    </>
  );
}
