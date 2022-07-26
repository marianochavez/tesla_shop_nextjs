import {Box, Button, Container, Icon, Link, Stack, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import {SiTesla} from "react-icons/si";
import {useContext} from "react";

import {UiContext} from "../../context";

export const AdminNavbar = () => {
  const {toggleSideMenu} = useContext(UiContext);

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
        <Box>
          <Stack alignItems="center" direction="row" fontSize="lg">
            <Button variant="ghost" onClick={toggleSideMenu}>
              Menu
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
