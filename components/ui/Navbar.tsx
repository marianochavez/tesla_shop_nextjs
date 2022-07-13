import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Container,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {SiTesla} from "react-icons/si";
import {AiOutlineSearch} from "react-icons/ai";
import {BsCart2} from "react-icons/bs";

export const Navbar = () => {
  return (
    <Container maxWidth="container" px={6} py={2}>
      <Stack alignItems="center" direction="row">
        <Box>
          <NextLink passHref href="/">
            <Link>
              <Stack alignItems="baseline" direction="row" fontSize="2xl" spacing={0}>
                <Icon as={SiTesla} color="red.700" />
                <Text fontWeight="bold">esla </Text>
                <Text fontSize="md" pl={2}>
                  | Shop
                </Text>
              </Stack>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />
        <Box>
          <Stack direction="row" alignItems="center">
            <NextLink passHref href="/category/men">
              <Link>
                <Button variant="ghost">Hombres</Button>
              </Link>
            </NextLink>
            <Text fontWeight="normal">|</Text>
            <NextLink passHref href="/category/women">
              <Link>
                <Button variant="ghost">Mujeres</Button>
              </Link>
            </NextLink>
            <Text fontWeight="normal">|</Text>
            <NextLink passHref href="/category/kid">
              <Link>
                <Button variant="ghost">Niños</Button>
              </Link>
            </NextLink>
          </Stack>
        </Box>
        <Box flex={1} />
        <Box>
          <Stack alignItems="center" direction="row" fontSize="lg">
            <Icon as={AiOutlineSearch} />
            <NextLink passHref href="/cart">
              <Link>
                <Avatar bg="transparent" icon={<BsCart2 />}>
                  <AvatarBadge
                    bg="secondary.default"
                    boxSize="1.60em"
                    color="white"
                    fontSize="sm"
                    top={0}
                  >
                    2
                  </AvatarBadge>
                </Avatar>
              </Link>
            </NextLink>
            <Button variant="ghost">Menu</Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
