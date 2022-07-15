import {Box} from "@chakra-ui/react";
import Head from "next/head";
import {FC, ReactNode} from "react";

interface Props {
  children: ReactNode;
  title: string;
}

export const AuthLayout: FC<Props> = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Box
          alignItems="center"
          display="flex"
          height="calc(100vh - 200px)"
          justifyContent="center"
        >
          {children}
        </Box>
      </main>
    </>
  );
};
