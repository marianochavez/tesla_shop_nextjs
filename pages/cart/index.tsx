import {Box, Button, Container, Divider, Stack, Text} from "@chakra-ui/react";

import {CartList, OrderSummary} from "../../components/cart";
import {ShopLayout} from "../../components/layouts";

const CartPage = () => {
  return (
    <ShopLayout pageDescription="Carrito de compras de la tienda" title="Carrito -3">
      <Text variant="h1">Carrito</Text>

      <Stack direction="row">
        <Stack direction="column" flex={1}>
          <CartList editable />
        </Stack>
        <Container maxW="45%">
          <Stack
            border="1px solid rgba(0, 0, 0, 0.1)"
            borderRadius="10px"
            boxShadow="0px 5px 5px rgba(0, 0, 0, 0.2)"
            p={4}
          >
            <Text variant="h2">Orden</Text>
            <Divider my={2} />
            <OrderSummary />

            <Box>
              <Button colorScheme="blue" size="sm" w="100%">
                Checkout
              </Button>
            </Box>
          </Stack>
        </Container>
      </Stack>
    </ShopLayout>
  );
};

export default CartPage;
