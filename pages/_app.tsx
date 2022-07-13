import "../styles/globals.css";

import type {AppProps} from "next/app";

import {ChakraProvider} from "@chakra-ui/react";

import {lightTheme} from "../themes";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={lightTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
