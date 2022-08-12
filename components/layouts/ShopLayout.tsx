import Head from "next/head";
import {FC, ReactNode} from "react";

import {Footer, Navbar, SideMenu} from "../ui";

interface Props {
  children: ReactNode;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({children, title, pageDescription, imageFullUrl}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta content={pageDescription} name="description" />

        <meta content={title} name="og:title" />
        <meta content={pageDescription} name="og:description" />

        {imageFullUrl && <meta content={imageFullUrl} name="og:image" />}
      </Head>

      <nav>
        <Navbar />
      </nav>
      <SideMenu />
      <main
        style={{
          margin: "80px auto",
          minHeight: "calc(100vh - 100px)",
          padding: "0px 20px",
        }}
      >
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};
