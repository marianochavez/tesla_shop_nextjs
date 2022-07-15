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
} from "@chakra-ui/react";
import NextLink from "next/link";

import {AuthLayout} from "../../components/layouts";

const LoginPage = () => {
  return (
    <AuthLayout title="Ingresar">
      <Box p="10px 20px" w={350}>
        <Grid gap={2}>
          <GridItem>
            <Text variant="h1">Iniciar sesión</Text>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="text" />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <Input id="password" type="password" />
            </FormControl>
          </GridItem>

          <GridItem>
            <Button colorScheme="yellow" size="lg" w="100%">
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
    </AuthLayout>
  );
};

export default LoginPage;
