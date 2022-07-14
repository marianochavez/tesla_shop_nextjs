import {Grid, Text, GridItem, Container, Stack, Divider, Box, Link, Button} from "@chakra-ui/react";
import NextLink from "next/link";

import {CartList, OrderSummary} from "../../components/cart";
import {ShopLayout} from "../../components/layouts";

const SummaryPage = () => {
  return (
    <ShopLayout pageDescription="Resumen de la orden" title="Resumen de orden">
      <Text variant="h1">Resumen de la orden</Text>

      <Grid templateColumns={{base: "repeat(1,1fr)", sm: "repeat(2,1fr)"}}>
        <GridItem>
          <CartList />
        </GridItem>
        <GridItem>
          <Container>
            <Stack
              border="1px solid rgba(0, 0, 0, 0.1)"
              borderRadius="10px"
              boxShadow="0px 5px 5px rgba(0, 0, 0, 0.2)"
              p={4}
            >
              <Text variant="h2">Resumen (3 productos)</Text>
              <Divider my={1} />

              <Box display="flex" justifyContent="space-between">
                <Text variant="subtitle1">Dirección de entrega</Text>
                <NextLink passHref href="/checkout/address">
                  <Link textDecor="underline">Editar</Link>
                </NextLink>
              </Box>

              <Text>Fernando Herrera</Text>
              <Text>323 Algun lugar</Text>
              <Text>Stittsville, HYA 23S</Text>
              <Text>Canadá</Text>
              <Text>+1 23123123</Text>

              <Divider my={1} />

              <Box display="flex" justifyContent="end">
                <NextLink passHref href="/cart">
                  <Link textDecor="underline">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box mt={3}>
                <Button colorScheme="yellow" w="100%">
                  Confirmar Orden
                </Button>
              </Box>
            </Stack>
          </Container>
        </GridItem>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
