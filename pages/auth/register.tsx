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
  Tag,
  Icon,
  FormErrorMessage,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {useRouter} from "next/router";
import {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {BiErrorCircle} from "react-icons/bi";

import {AuthLayout} from "../../components/layouts";
import {AuthContext} from "../../context";
import {validations} from "../../utils";

type FormData = {
  email: string;
  password: string;
  name: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const {registerUser} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterUser = async ({email, password, name}: FormData) => {
    setShowError(false);
    const {message, hasError} = await registerUser(email, password, name);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => {
        setShowError(false);
      }, 3000);

      return;
    }

    const destination = router.query.p?.toString() || "/";

    router.replace(destination);
  };

  return (
    <AuthLayout title="Registrarse">
      <form noValidate onSubmit={handleSubmit(onRegisterUser)}>
        <Box p="10px 20px" w={350}>
          <Grid gap={2}>
            <GridItem>
              <Text variant="h1">Crear cuenta</Text>
              <Tag colorScheme="red" display={showError ? "flex" : "none"} p={3} w="100%">
                <Icon as={BiErrorCircle} fontSize="lg" mr={1} />
                {errorMessage}
              </Tag>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Nombre Completo</FormLabel>
                <Input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "Este campo es requerido",
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
                Registrarme
              </Button>
            </GridItem>

            <GridItem display="flex" justifyContent="end" pt={2}>
              <NextLink
                passHref
                href={router.query.p ? `/auth/login?p=${router.query.p}` : "/auth/login"}
              >
                <Link textDecor="underline">¿Ya tienes cuenta?</Link>
              </NextLink>
            </GridItem>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
