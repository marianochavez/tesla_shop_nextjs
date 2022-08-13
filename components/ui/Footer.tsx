import {
  Box,
  chakra,
  Container,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import {FaGithub, FaLinkedin, FaTwitter} from "react-icons/fa";
import {ReactNode} from "react";
import {SiTesla} from "react-icons/si";
import NextLink from "next/link";

const SocialButton = ({
  children,
  label,
  href,
  target = "_blank",
}: {
  children: ReactNode;
  label: string;
  href: string;
  target?: string;
}) => {
  return (
    <chakra.button
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
      alignItems={"center"}
      as={"a"}
      bg={useColorModeValue("whiteAlpha.100", "blackAlpha.100")}
      cursor={"pointer"}
      display={"inline-flex"}
      h={8}
      href={href}
      justifyContent={"center"}
      rounded={"full"}
      target={target}
      transition={"background 0.3s ease"}
      w={8}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("blackAlpha.900", "gray.900")}
      color={useColorModeValue("white", "gray.200")}
      mt={10}
      pt={8}
    >
      <Container align={"center"} as={Stack} justify={"center"} maxW={"6xl"} py={4} spacing={4}>
        <Stack alignItems="center" direction="row" fontSize="2xl" ml="-10">
          <Icon as={SiTesla} color="red.700" fontSize="3xl" />
          <Box display="flex" flexDir="row" fontWeight="bold" pl={4} position="absolute" pt={2}>
            esla{" "}
          </Box>
        </Stack>
        <Stack direction={"row"} fontWeight="bold" spacing={6}>
          <NextLink passHref href="/">
            <Link>Inicio</Link>
          </NextLink>
          <NextLink passHref href="/category/men">
            <Link>Hombres</Link>
          </NextLink>
          <NextLink passHref href="/category/women">
            <Link>Mujeres</Link>
          </NextLink>
          <NextLink passHref href="/category/kid">
            <Link>Niños</Link>
          </NextLink>
        </Stack>
      </Container>

      <Box
        borderColor={useColorModeValue("red.700", "red.700")}
        borderStyle={"solid"}
        borderTopWidth={1}
      >
        <Container
          align={{base: "center", md: "center"}}
          as={Stack}
          direction={{base: "column", md: "row"}}
          justify={{base: "center", md: "space-between"}}
          maxW={"6xl"}
          py={4}
          spacing={4}
        >
          <Text>Made by Mariano. Educational purpose.</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              href={"https://github.com/marianochavez/tesla_shop_nextjs"}
              label={"GitHub"}
            >
              <FaGithub />
            </SocialButton>
            <SocialButton href={"https://www.linkedin.com/in/mariano-chavez"} label={"Linkedin"}>
              <FaLinkedin />
            </SocialButton>
            <SocialButton href={"#"} label={"Twitter"}>
              <FaTwitter />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
