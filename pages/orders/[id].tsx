import {Container, Link, Stack, Tag, TagLabel, TagLeftIcon, Text} from "@chakra-ui/react";
import {MdCreditScore} from "react-icons/md";
import NextLink from "next/link";
import {Divider, Box} from "@chakra-ui/react";

import {CartList, OrderSummary} from "../../components/cart";
import {ShopLayout} from "../../components/layouts/ShopLayout";

const OrderPage = () => {
  return (
    <ShopLayout pageDescription="Resumen de la orden" title="Resumen de la orden 1235656">
      <Text variant="h1">Orden: ABC123</Text>

      {/* <Tag colorScheme="red" my={2} size="md" variant="outline">
        <TagLeftIcon as={MdOutlineCreditCardOff} />
        <TagLabel>Pendiente de pago</TagLabel>
      </Tag> */}
      <Tag colorScheme="green" my={2} size="md" variant="outline">
        <TagLeftIcon as={MdCreditScore} />
        <TagLabel>Orden ya fue pagada</TagLabel>
      </Tag>

      <Stack direction="row">
        <Stack direction="column" flex={1}>
          <CartList />
        </Stack>
        <Container maxW="45%">
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
              <Text variant="h1">Pagar</Text>

              <Tag colorScheme="green" my={2} size="md" variant="outline">
                <TagLeftIcon as={MdCreditScore} />
                <TagLabel>Orden ya fue pagada</TagLabel>
              </Tag>
            </Box>
          </Stack>
        </Container>
      </Stack>
    </ShopLayout>
  );
};

export default OrderPage;
