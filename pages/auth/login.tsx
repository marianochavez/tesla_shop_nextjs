import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
  Link,
  FormErrorMessage,
  Tag,
  Icon,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {useForm} from "react-hook-form";
import {BiErrorCircle} from "react-icons/bi";
import {useState, useContext} from "react";
import {useRouter} from "next/router";

import {AuthLayout} from "../../components/layouts";
import {validations} from "../../utils";
import {AuthContext} from "../../context";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const {loginUser} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({email, password}: FormData) => {
    setShowError(false);

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);

      return;
    }
    router.replace("/");
  };

  return (
    <AuthLayout title="Ingresar">
      <form noValidate onSubmit={handleSubmit(onLoginUser)}>
        <Box p="10px 20px" w={350}>
          <Grid gap={2}>
            <GridItem>
              <Text variant="h1">Iniciar sesión</Text>
              <Tag colorScheme="red" display={showError ? "flex" : "none"} p={3} w="100%">
                <Icon as={BiErrorCircle} fontSize="lg" mr={1} />
                Email o contraseña incorrectos
              </Tag>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Este campo es requerido",
                    validate: validations.isEmail,
                  })}
                />
                {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Este campo es requerido",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
                {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
              </FormControl>
            </GridItem>

            <GridItem>
              <Button colorScheme="yellow" size="lg" type="submit" w="100%">
                Ingresar
              </Button>
            </GridItem>

            <GridItem display="flex" justifyContent="end" pt={2}>
              <NextLink passHref href="/auth/register">
                <Link textDecor="underline">¿No tienes una cuenta?</Link>
              </NextLink>
            </GridItem>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
