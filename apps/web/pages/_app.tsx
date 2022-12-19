import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap" rel="stylesheet"/>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          primaryColor: 'teal',
          primaryShade: 5,
          fontFamily: 'Rubik, sans-serif',
          headings: {
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 600
          },
          fontSizes: {
            md: 20
          },
          colors: {
            // override dark colors to change them for all components
            dark: [
              '#EEEEEE',
              '#D4D4D4',
              '#D4D4D4',
              '#195681',
              '#164B70',
              '#144364',
              '#0A2232',
              '#081925',
              '#081925',
              '#0A2232',
            ],
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}