import {
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
  Divider,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {useForm} from "react-hook-form";
import {BiErrorCircle} from "react-icons/bi";
import {GetServerSideProps} from "next";
import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import {getSession, signIn, getProviders} from "next-auth/react";
import {FcGoogle} from "react-icons/fc";
import {BsGithub} from "react-icons/bs";

import {AuthLayout} from "../../components/layouts";
import {validations} from "../../utils";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  useEffect(() => {
    const error = router.query.error as string;

    if (error === "CredentialsSignin") {
      setShowError(true);
    }
  }, [router]);

  const onLoginUser = async ({email, password}: FormData) => {
    setShowError(false);

    // OLD WAY
    // const isValidLogin = await loginUser(email, password);

    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);

    //   return;
    // }
    // const destination = router.query.p?.toString() || "/";

    // router.replace(destination);
    await signIn("credentials", {email, password});
  };

  return (
    <AuthLayout title="Ingresar">
      <form noValidate onSubmit={handleSubmit(onLoginUser)}>
        <Grid gap={2} p="10px 20px" w={350}>
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
            <NextLink
              passHref
              href={router.query.p ? `/auth/register?p=${router.query.p}` : "/auth/register"}
            >
              <Link textDecor="underline">¿No tienes una cuenta?</Link>
            </NextLink>
          </GridItem>

          <GridItem>
            <Divider borderColor="blackAlpha.400" mb={2} mt={2} />
            {providers.google && (
              <Button
                colorScheme="blue"
                leftIcon={<Icon as={FcGoogle} />}
                mt={2}
                variant="outline"
                w="100%"
                onClick={() => signIn(providers.google.id)}
              >
                {providers.google.name}
              </Button>
            )}
            {providers.github && (
              <Button
                colorScheme="blackAlpha"
                leftIcon={<Icon as={BsGithub} fontSize="lg" />}
                mt={3}
                variant="outline"
                w="100%"
                onClick={() => signIn(providers.github.id)}
              >
                {providers.github.name}
              </Button>
            )}
          </GridItem>
        </Grid>
      </form>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const session = await getSession({req});
  const {p = "/"} = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
