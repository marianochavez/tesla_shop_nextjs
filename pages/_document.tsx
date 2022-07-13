import {ColorModeScript} from "@chakra-ui/react";
import Document, {DocumentContext, Html, Head, Main, NextScript} from "next/document";

import {lightTheme} from "../themes";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initalProps = await Document.getInitialProps(ctx);

    return initalProps;
  }
  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialColorMode={lightTheme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
