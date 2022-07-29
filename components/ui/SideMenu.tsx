import {useContext, useState} from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Icon,
  InputGroup,
  InputRightElement,
  Stack,
  Divider,
  Text,
  Show,
} from "@chakra-ui/react";
import {
  AiOutlineLogout,
  AiOutlineMan,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineWoman,
} from "react-icons/ai";
import {useRouter} from "next/router";
import {BsBagCheck, BsKey} from "react-icons/bs";
import {SiTesla} from "react-icons/si";
import {FaChild, FaUserCog} from "react-icons/fa";
import {MdOutlineCategory, MdOutlineDashboard} from "react-icons/md";

import {AuthContext, UiContext} from "../../context";

export const SideMenu = () => {
  const router = useRouter();
  const {user, isLoggedIn, logoutUser} = useContext(AuthContext);
  const {isMenuOpen, toggleSideMenu} = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState("");

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer isOpen={isMenuOpen} placement="right" size="xs" onClose={toggleSideMenu}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Icon as={SiTesla} color="red.700" fontSize="2xl" />
        </DrawerHeader>

        <DrawerBody>
          <InputGroup>
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
              <Button variant="ghost" onClick={onSearchTerm}>
                <Icon as={AiOutlineSearch} />
              </Button>
            </InputRightElement>
          </InputGroup>

          <Stack direction="column" maxW="container" py={3}>
            {isLoggedIn && (
              <>
                <Button
                  colorScheme="blackAlpha"
                  justifyContent="left"
                  leftIcon={<AiOutlineUser />}
                  size="md"
                  variant="ghost"
                >
                  Perfil
                </Button>
                <Button
                  colorScheme="blackAlpha"
                  justifyContent="left"
                  leftIcon={<BsBagCheck />}
                  size="md"
                  variant="ghost"
                  onClick={() => navigateTo("/orders/history")}
                >
                  Mis ordenes
                </Button>
              </>
            )}

            <Show below="md">
              <Button
                colorScheme="blackAlpha"
                justifyContent="left"
                leftIcon={<AiOutlineMan />}
                size="md"
                variant="ghost"
                onClick={() => navigateTo("/category/men")}
              >
                Hombres
              </Button>
              <Button
                colorScheme="blackAlpha"
                justifyContent="left"
                leftIcon={<AiOutlineWoman />}
                size="md"
                variant="ghost"
                onClick={() => navigateTo("/category/women")}
              >
                Mujeres
              </Button>
              <Button
                colorScheme="blackAlpha"
                justifyContent="left"
                leftIcon={<FaChild />}
                size="md"
                variant="ghost"
                onClick={() => navigateTo("/category/kid")}
              >
                Niños
              </Button>
            </Show>
            {isLoggedIn ? (
              <Button
                colorScheme="blackAlpha"
                justifyContent="left"
                leftIcon={<AiOutlineLogout />}
                size="md"
                variant="ghost"
                onClick={logoutUser}
              >
                Salir
              </Button>
            ) : (
              <Button
                colorScheme="blackAlpha"
                justifyContent="left"
                leftIcon={<BsKey />}
                size="md"
                variant="ghost"
                onClick={() => navigateTo(`/auth/login?p=${router.pathname}`)}
              >
                Ingresar
              </Button>
            )}
          </Stack>

          {user?.role === "admin" && (
            <>
              <Divider />
              <Stack direction="column" maxW="container" py={3}>
                <Text color="gray" fontWeight="bold">
                  Admin Panel
                </Text>
                <Button
                  colorScheme="blackAlpha"
                  justifyContent="left"
                  leftIcon={<MdOutlineDashboard />}
                  size="md"
                  variant="ghost"
                  onClick={() => navigateTo("/admin")}
                >
                  Dashboard
                </Button>
                <Button
                  colorScheme="blackAlpha"
                  justifyContent="left"
                  leftIcon={<MdOutlineCategory />}
                  size="md"
                  variant="ghost"
                  onClick={() => navigateTo("/admin/products")}
                >
                  Productos
                </Button>
                <Button
                  colorScheme="blackAlpha"
                  justifyContent="left"
                  leftIcon={<BsBagCheck />}
                  size="md"
                  variant="ghost"
                  onClick={() => navigateTo("/admin/orders")}
                >
                  Ordenes
                </Button>
                <Button
                  colorScheme="blackAlpha"
                  justifyContent="left"
                  leftIcon={<FaUserCog />}
                  size="md"
                  variant="ghost"
                  onClick={() => navigateTo("/admin/users")}
                >
                  Usuarios
                </Button>
              </Stack>
            </>
          )}
        </DrawerBody>

        {/* <DrawerFooter>
            <Button colorScheme="red" mr={3} variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
          </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};
