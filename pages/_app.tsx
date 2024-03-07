import { useState, useEffect } from 'react';
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Main } from 'layouts/shell';

import THEME from 'constants/theme';
import '../styles/global.scss';
import '../styles/markdown.scss';



export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);
  return (
    <>
      <Head>
        <title>AI Native</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={THEME}
      >
        <Notifications />
        {render ?
          <ModalsProvider>
            <Main><Component {...pageProps} /></Main>
          </ModalsProvider> :
          null
        }
      </MantineProvider>
    </>
  );
}
