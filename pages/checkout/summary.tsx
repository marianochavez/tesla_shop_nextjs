import {
  Grid,
  Text,
  GridItem,
  Container,
  Stack,
  Divider,
  Box,
  Link,
  Button,
  Tag,
  Icon,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import NextLink from "next/link";
import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import {BiErrorCircle} from "react-icons/bi";

import {CartList, OrderSummary} from "../../components/cart";
import {ShopLayout} from "../../components/layouts";
import {FullScreenLoading} from "../../components/ui";
import {CartContext} from "../../context";
import {countries} from "../../utils";

const SummaryPage = () => {
  const router = useRouter();
  const {shippingAddress, numberOfItems, createOrder} = useContext(CartContext);

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!Cookies.get("name")) {
      router.push("/checkout/address");
    }
  }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);
    const {hasError, message} = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);

      return;
    }

    router.replace(`/orders/${message}`);
  };

  if (!shippingAddress) {
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
                <Text variant="subtitle1">Direcci??n de entrega</Text>
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
                <Button colorScheme="yellow" disabled={isPosting} w="100%" onClick={onCreateOrder}>
                  Confirmar Orden
                </Button>
                <Tag
                  colorScheme="red"
                  display={errorMessage ? "flex" : "none"}
                  mt={3}
                  p={3}
                  w="100%"
                >
                  <Icon as={BiErrorCircle} fontSize="lg" mr={1} />
                  {errorMessage}
                </Tag>
              </Box>
            </Stack>
          </Container>
        </GridItem>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
