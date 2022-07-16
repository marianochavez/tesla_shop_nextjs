import "../styles/globals.css";

import type {AppProps} from "next/app";

import {ChakraProvider} from "@chakra-ui/react";
import {SWRConfig} from "swr";

import {lightTheme} from "../themes";
import {UiProvider} from "../context";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <UiProvider>
        <ChakraProvider theme={lightTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </UiProvider>
    </SWRConfig>
  );
}

export default MyApp;
