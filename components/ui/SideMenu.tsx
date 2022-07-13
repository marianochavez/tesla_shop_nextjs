import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  Icon,
  InputGroup,
  InputRightElement,
  Stack,
  Divider,
  Text,
} from "@chakra-ui/react";
import {AiOutlineLogout, AiOutlineSearch, AiOutlineUser} from "react-icons/ai";
import {BsBagCheck, BsKey} from "react-icons/bs";
import {SiTesla} from "react-icons/si";
import {RiProductHuntLine} from "react-icons/ri";
import {FaUserCog} from "react-icons/fa";

export const SideMenu = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      {/* <Button colorScheme="teal" onClick={onOpen}>
        Open
      </Button> */}
      {/* !! isOpen */}
      <Drawer isOpen={false} placement="right" size="xs" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Icon as={SiTesla} color="red.700" fontSize="2xl" />
          </DrawerHeader>

          <DrawerBody>
            <InputGroup>
              <InputRightElement pointerEvents="none">
                <Icon as={AiOutlineSearch} />
              </InputRightElement>
              <Input placeholder="Buscar..." type="text" />
            </InputGroup>

            <Stack direction="column" maxW="container" py={3}>
              <Button
                colorScheme="blackAlpha"
                justifyContent="left"
                leftIcon={<AiOutlineUser />}
                size="lg"
                variant="ghost"
              >
                Perfil
              </Button>
              <Button
                colorScheme="blackAlpha"
                justifyContent="left"
                leftIcon={<BsBagCheck />}
                size="lg"
                variant="ghost"
              >
                Mis ordenes
              </Button>
              <Button
                colorScheme="blackAlpha"
                justifyContent="left"
                leftIcon={<BsKey />}
                size="lg"
                variant="ghost"
              >
                Ingresar
              </Button>
              <Button
                colorScheme="blackAlpha"
                justifyContent="left"
                leftIcon={<AiOutlineLogout />}
                size="lg"
                variant="ghost"
              >
                Salir
              </Button>
            </Stack>

            <Divider />

            <Stack direction="column" maxW="container" py={3}>
              <Text color="gray" fontWeight="bold">
                Admin Panel
              </Text>
              <Button
                colorScheme="blackAlpha"
                justifyContent="left"
                leftIcon={<RiProductHuntLine />}
                size="lg"
                variant="ghost"
              >
                Productos
              </Button>
              <Button
                colorScheme="blackAlpha"
                justifyContent="left"
                leftIcon={<BsBagCheck />}
                size="lg"
                variant="ghost"
              >
                Ordenes
              </Button>
              <Button
                colorScheme="blackAlpha"
                justifyContent="left"
                leftIcon={<FaUserCog />}
                size="lg"
                variant="ghost"
              >
                Usuarios
              </Button>
            </Stack>
          </DrawerBody>

          {/* <DrawerFooter>
            <Button colorScheme="red" mr={3} variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};
