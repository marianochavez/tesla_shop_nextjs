import "../styles/globals.css";

import type {AppProps} from "next/app";

import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {SessionProvider} from "next-auth/react";
import {ChakraProvider} from "@chakra-ui/react";
import {SWRConfig} from "swr";

import {lightTheme} from "../themes";
import {UiProvider, CartProvider, AuthProvider} from "../context";

function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider
        options={{"client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT || "test"}}
      >
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
      </PayPalScriptProvider>
    </SessionProvider>
  );
}

export default MyApp;
