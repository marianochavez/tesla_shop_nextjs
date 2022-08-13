import {
  HStack,
  Icon,
  SimpleGrid,
  Text,
  Box,
  Grid,
  Tag,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputRightElement,
  InputGroup,
  Divider,
  Show,
} from "@chakra-ui/react";
import {GetServerSideProps, NextPage} from "next";
import {getSession, signIn} from "next-auth/react";
import {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {AiOutlineProfile} from "react-icons/ai";
import {BiErrorCircle} from "react-icons/bi";
import {MdAttachMoney, MdOutlineSummarize, MdShoppingCart} from "react-icons/md";

import {SummaryTitle} from "../../components/admin";
import {ShopLayout} from "../../components/layouts";
import {AuthContext} from "../../context";
import {dbOrders, dbUsers} from "../../database";

type FormData = {
  email: string;
  name: string;
  oldPassword: string;
  newPassword: string;
};

type Props = {
  user: {
    name: string;
    email: string;
  };
  ordersStats: {
    totalProductsPurchased: number;
    totalPaid: number;
    paidOrders: number;
    unpaidOrders: number;
  };
};

const UserProfile: NextPage<Props> = ({user, ordersStats}) => {
  const {updateUser} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      email: user.email,
      name: user.name,
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeUser = async ({name, oldPassword, newPassword}: FormData) => {
    setShowError(false);
    const {message, hasError} = await updateUser(name, user.email, oldPassword, newPassword);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => {
        setShowError(false);
      }, 3000);

      return;
    }

    await signIn("credentials", {email: user.email, password: newPassword});
  };

  return (
    <ShopLayout pageDescription="Administración de perfil de usuario" title="Mi perfil">
      <HStack mb={6}>
        <Icon as={AiOutlineProfile} fontSize="2xl" />
        <Text variant="h1">Mi Perfil</Text>
      </HStack>
      <SimpleGrid columns={[1, 1, 2]} gap={3}>
        <Box p="10px 20px">
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onChangeUser)}>
            <Grid gap={2} justifyContent="center">
              <GridItem>
                {/* <Text variant="h2">Mis Datos</Text> */}
                <Tag colorScheme="red" display={showError ? "flex" : "none"} p={3} w="100%">
                  <Icon as={BiErrorCircle} fontSize="lg" mr={1} />
                  {errorMessage}
                </Tag>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    {...register("name", {
                      minLength: {
                        value: 2,
                        message: "Este campo debe tener al menos 2 caracteres",
                      },
                    })}
                  />
                  {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input disabled id="email" type="email" value={user.email} />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired isInvalid={!!errors.oldPassword}>
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      id="oldPassword"
                      type={showPassword ? "text" : "password"}
                      {...register("oldPassword", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 6,
                          message: "La contraseña debe tener al menos 6 caracteres",
                        },
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Ocultar" : "Mostrar"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.oldPassword && (
                    <FormErrorMessage>{errors.oldPassword.message}</FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={!!errors.newPassword}>
                  <FormLabel>Contraseña nueva</FormLabel>
                  <InputGroup>
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      {...register("newPassword", {
                        minLength: {
                          value: 6,
                          message: "La contraseña debe tener al menos 6 caracteres",
                        },
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={(showPassword) => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Ocultar" : "Mostrar"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.newPassword && (
                    <FormErrorMessage>{errors.newPassword.message}</FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>

              <GridItem>
                <Button colorScheme="yellow" size="lg" type="submit" w="100%">
                  Actualizar
                </Button>
              </GridItem>
            </Grid>
          </form>
        </Box>
        <Show below="md">
          <Divider />
          <Text variant="h2">Resumen</Text>
        </Show>
        <SimpleGrid columns={[1, 2, 2]} gap={3}>
          <SummaryTitle
            icon={<Icon as={MdAttachMoney} color="green.600" fontSize={50} />}
            subTitle="Dinero gastado"
            title={ordersStats.totalPaid}
          />
          <SummaryTitle
            icon={<Icon as={MdShoppingCart} color="blue.600" fontSize={50} />}
            subTitle="Productos comprados"
            title={ordersStats.totalProductsPurchased}
          />
          <SummaryTitle
            icon={<Icon as={MdOutlineSummarize} color="green.600" fontSize={50} />}
            subTitle="Ordenes Pagadas"
            title={ordersStats.paidOrders}
          />
          <SummaryTitle
            icon={<Icon as={MdOutlineSummarize} color="red.600" fontSize={50} />}
            subTitle="Ordenes Sin Pagar"
            title={ordersStats.unpaidOrders}
          />
        </SimpleGrid>
      </SimpleGrid>
    </ShopLayout>
  );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session: any = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/user/profile`,
        permanent: false,
      },
    };
  }

  const id = session.user._id;

  const user = await dbUsers.getUserProfile(id);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const ordersStats = await dbOrders.getOrdersStatsByUser(id);

  return {
    props: {user, ordersStats},
  };
};
