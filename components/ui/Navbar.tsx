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
import {FiMenu} from "react-icons/fi";
import {useRouter} from "next/router";
import {useContext, useState} from "react";
import {MdOutlineClear} from "react-icons/md";

import {CartContext, UiContext} from "../../context";

export const Navbar = () => {
  const {toggleSideMenu} = useContext(UiContext);
  const {pathname, push} = useRouter();
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
        <NextLink passHref href="/">
          <Link>
            <Stack alignItems="center" direction="row" fontSize="2xl" pr="120px">
              <Icon as={SiTesla} color="red.700" fontSize="3xl" />
              <Box display="flex" flexDir="row" fontWeight="bold" pl={4} position="absolute" pt={2}>
                esla{" "}
                <Text display={{base: "none", sm: "flex"}} fontWeight="normal" pl={2}>
                  | Shop
                </Text>
              </Box>
            </Stack>
          </Link>
        </NextLink>
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
                  _hover={{backgroundColor: "red.100"}}
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
                  _hover={{backgroundColor: "red.100"}}
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
                  _hover={{backgroundColor: "red.100"}}
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
        <Stack alignItems="center" direction="row" display="flex" m="0">
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
              <Button
                _hover={{color: "red.700"}}
                alignItems="center"
                className="fadeIn"
                display="flex"
                fontSize="lg"
                variant="unstyled"
                onClick={() => setIsSearchVisible(true)}
              >
                <Icon as={AiOutlineSearch} />
              </Button>
            )}
          </Hide>
          {/* -- mobile -- */}
          <Button
            _hover={{color: "red.700"}}
            display={{base: "flex", md: "none"}}
            fontSize="lg"
            m="0"
            variant="unstyled"
            onClick={toggleSideMenu}
          >
            <AiOutlineSearch />
          </Button>
          {/* --- */}
          <NextLink passHref href="/cart">
            <Link pr="10px">
              <Avatar _hover={{color: "red.700"}} bg="transparent" icon={<BsCart2 />}>
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
          <Button
            _hover={{color: "red.700"}}
            display="flex"
            fontSize="lg"
            m="0"
            variant="unstyled"
            onClick={toggleSideMenu}
          >
            <Text display={{base: "none", md: "flex"}} ml={2}>
              Menu
            </Text>
            <Icon as={FiMenu} display={{base: "flex", md: "none"}} />
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};
