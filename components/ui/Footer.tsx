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
import {FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";
import {ReactNode} from "react";
import {SiTesla} from "react-icons/si";
import NextLink from "next/link";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
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
    >
      <Container align={"center"} as={Stack} justify={"center"} maxW={"6xl"} py={4} spacing={4}>
        <Stack alignItems="center" direction="row" fontSize="2xl" ml="-10">
          <Icon as={SiTesla} color="red.700" fontSize="3xl" />
          <Box display="flex" flexDir="row" fontWeight="bold" pl={4} position="absolute" pt={2}>
            esla{" "}
          </Box>
        </Stack>
        <Stack direction={"row"} spacing={6}>
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
        borderColor={useColorModeValue("gray.200", "gray.700")}
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
          <Text>© 2022 Tesla Shop. Educational page.</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton href={"#"} label={"Twitter"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton href={"#"} label={"YouTube"}>
              <FaYoutube />
            </SocialButton>
            <SocialButton href={"#"} label={"Instagram"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
