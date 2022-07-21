import "../styles/globals.css";

import type {AppProps} from "next/app";

import {SessionProvider} from "next-auth/react";
import {ChakraProvider} from "@chakra-ui/react";
import {SWRConfig} from "swr";

import {lightTheme} from "../themes";
import {UiProvider, CartProvider, AuthProvider} from "../context";

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ChakraProvider theme={lightTheme}>
                <Component {...pageProps} />
              </ChakraProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
