import {Box, Button, Container, Divider, HStack, Icon, Link, Stack, Text} from "@chakra-ui/react";
import {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {BsCart4} from "react-icons/bs";

import {CartList, OrderSummary} from "../../components/cart";
import {ShopLayout} from "../../components/layouts";
import {CartContext} from "../../context";

const CartPage = () => {
  const router = useRouter();
  const {isLoaded, cart} = useContext(CartContext);

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) {
    return <></>;
  }

  return (
    <ShopLayout pageDescription="Carrito de compras de la tienda" title="Carrito -3">
      <HStack alignItems="baseline" display="flex" mb={2}>
        <Icon as={BsCart4} fontSize="2xl" />
        <Text variant="h1">Carrito</Text>
      </HStack>

      <Stack direction={["column", "column", "row"]}>
        <Stack direction="column" flex={1}>
          <CartList editable />
        </Stack>
        <Divider display={["flex", "flex", "none"]} pt={3} />
        <Container maxW={["100%", "100%", "45%"]} p="15px 0 0 0">
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
              <Button as={Link} colorScheme="blue" href="/checkout/address" size="sm" w="100%">
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
