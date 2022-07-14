import Head from "next/head";
import {FC, ReactNode} from "react";

import {Navbar, SideMenu} from "../ui";

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
          margin: "20px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        {children}
      </main>

      <footer>{/* TODO: mi custom footer */}</footer>
    </>
  );
};
