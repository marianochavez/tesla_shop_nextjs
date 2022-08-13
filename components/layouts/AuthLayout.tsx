import {Box, Icon, Link, VisuallyHidden} from "@chakra-ui/react";
import {motion} from "framer-motion";
import Head from "next/head";
import {FC, ReactNode} from "react";
import {SiTesla} from "react-icons/si";
import NextLink from "next/link";

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
        <motion.div
          animate={{opacity: 1}}
          initial={{opacity: 0}}
          style={{
            position: "absolute",
            width: "100%",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          transition={{repeat: Infinity, repeatType: "reverse", duration: 2, ease: "easeInOut"}}
        >
          <NextLink passHref href="/">
            <Link>
              <Icon as={SiTesla} color="red.700" fontSize="6xl" />
              <VisuallyHidden>Inicio</VisuallyHidden>
            </Link>
          </NextLink>
        </motion.div>
        <Box
          alignItems="center"
          backgroundColor="black"
          color="white"
          display="flex"
          height="100vh"
          justifyContent="center"
        >
          {children}
        </Box>
      </main>
    </>
  );
};
