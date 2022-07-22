import {Grid, Text, GridItem, Container, Stack, Divider, Box, Link, Button} from "@chakra-ui/react";
import Cookies from "js-cookie";
import NextLink from "next/link";
import {useRouter} from "next/router";
import {useContext, useEffect} from "react";

import {CartList, OrderSummary} from "../../components/cart";
import {ShopLayout} from "../../components/layouts";
import {FullScreenLoading} from "../../components/ui";
import {CartContext} from "../../context";
import {countries} from "../../utils";

const SummaryPage = () => {
  const router = useRouter();
  const {shippingAddress, numberOfItems} = useContext(CartContext);

  useEffect(() => {
    if (numberOfItems === 0) {
      router.push("/cart/empty");
    }
    if (!Cookies.get("name")) {
      router.push("/checkout/address");
    }
  }, [router, numberOfItems]);

  if (!shippingAddress || numberOfItems === 0) {
    return <FullScreenLoading />;
  }

  const {name, lastName, address, address2 = "", city, country, phone, zipCode} = shippingAddress;

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
              <Text variant="h2">
                Resumen ({numberOfItems} {numberOfItems === 1 ? "producto" : "productos"})
              </Text>
              <Divider my={1} />

              <Box display="flex" justifyContent="space-between">
                <Text variant="subtitle1">Dirección de entrega</Text>
                <NextLink passHref href="/checkout/address">
                  <Link textDecor="underline">Editar</Link>
                </NextLink>
              </Box>

              <Text>
                {name} {lastName}
              </Text>
              <Text>
                {address} {address2 ? `, ${address2}` : ""}
              </Text>
              <Text>
                {city}, {zipCode}
              </Text>
              <Text>{countries.find((c) => c.code === country)?.name}</Text>
              <Text>{phone}</Text>

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
