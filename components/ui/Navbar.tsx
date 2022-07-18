import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Container,
  Hide,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {SiTesla} from "react-icons/si";
import {AiOutlineSearch} from "react-icons/ai";
import {BsCart2} from "react-icons/bs";
import {useRouter} from "next/router";
import {useContext, useState} from "react";
import {MdOutlineClear} from "react-icons/md";

import {CartContext, UiContext} from "../../context";

export const Navbar = () => {
  const {pathname, push} = useRouter();
  const {toggleSideMenu} = useContext(UiContext);
  const {numberOfItems} = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  return (
    <Container maxWidth="container" pt={2} px={6}>
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
        <Hide below="md">
          <Stack
            alignItems="center"
            className="fadeIn"
            direction="row"
            display={isSearchVisible ? "none" : "flex"}
          >
            <NextLink passHref href="/category/men">
              <Link>
                <Button
                  color={pathname === "/category/men" ? "red.700" : "secondary"}
                  variant="ghost"
                >
                  Hombres
                </Button>
              </Link>
            </NextLink>
            <Text fontWeight="normal">|</Text>
            <NextLink passHref href="/category/women">
              <Link>
                <Button
                  color={pathname === "/category/women" ? "red.700" : "secondary"}
                  variant="ghost"
                >
                  Mujeres
                </Button>
              </Link>
            </NextLink>
            <Text fontWeight="normal">|</Text>
            <NextLink passHref href="/category/kid">
              <Link>
                <Button
                  color={pathname === "/category/kid" ? "red.700" : "secondary"}
                  variant="ghost"
                >
                  Niños
                </Button>
              </Link>
            </NextLink>
          </Stack>
        </Hide>
        <Box flex={1} />
        <Box>
          <Stack alignItems="center" direction="row" fontSize="lg">
            {/* -- desktop -- */}
            <Hide below="md">
              {isSearchVisible ? (
                <InputGroup className="fadeIn" size="sm">
                  <Input
                    autoFocus
                    placeholder="Buscar..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onSearchTerm();
                      }
                    }}
                  />
                  <InputRightElement>
                    <Button variant="link" onClick={() => setIsSearchVisible(false)}>
                      <Icon as={MdOutlineClear} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              ) : (
                <Button className="fadeIn" variant="ghost" onClick={() => setIsSearchVisible(true)}>
                  <Icon as={AiOutlineSearch} />
                </Button>
              )}
            </Hide>
            {/* -- mobile -- */}
            <Button display={{base: "flex", md: "none"}} variant="ghost" onClick={toggleSideMenu}>
              <Icon as={AiOutlineSearch} />
            </Button>
            {/* --- */}
            <NextLink passHref href="/cart">
              <Link>
                <Avatar bg="transparent" icon={<BsCart2 />}>
                  <AvatarBadge
                    bg="secondary.default"
                    boxSize="1.70em"
                    color="white"
                    display={numberOfItems > 0 ? "flex" : "none"}
                    fontSize="sm"
                    fontWeight="semibold"
                    top={0}
                  >
                    {numberOfItems > 9 ? "+9" : numberOfItems}
                  </AvatarBadge>
                </Avatar>
              </Link>
            </NextLink>
            <Button variant="ghost" onClick={toggleSideMenu}>
              Menu
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
