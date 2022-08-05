import {useContext, useEffect, useState} from "react";
import {GetServerSideProps, NextPage} from "next";
import {
  Center,
  Container,
  Spinner,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {getSession} from "next-auth/react";
import {Divider, Box} from "@chakra-ui/react";
import {PayPalButtons} from "@paypal/react-paypal-js";
import {MdCreditScore, MdOutlineCreditCardOff} from "react-icons/md";

import {CartList, OrderSummary} from "../../components/cart";
import {ShopLayout} from "../../components/layouts/ShopLayout";
import {dbOrders, dbUsers} from "../../database";
import {IOrder} from "../../interfaces";
import {countries} from "../../utils";
import {teslaApi} from "../../axiosApi";
import {AuthContext} from "../../context";

export type OrderResponseBody = {
  id: string;
  status: "COMPLETED" | "SAVED" | "APPROVED" | "VOIDED" | "COMPLETED" | "PAYER_ACTION_REQUIRED";
};

interface Props {
  validUser: boolean;
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({validUser, order}) => {
  const router = useRouter();
  const {logoutUser} = useContext(AuthContext);
  const {shippingAddress} = order;
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (!validUser) {
      logoutUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validUser]);

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== "COMPLETED") {
      return alert("No hay pago en Paypal");
    }
    setIsPaying(true);

    try {
      await teslaApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order._id,
      });

      router.reload();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setIsPaying(false);
      alert("Error al procesar el pago");
    }
  };

  return (
    <ShopLayout pageDescription="Resumen de la orden" title="Resumen de la orden 1235656">
      <Text fontSize={["2xl"]} fontWeight="bold">
        Orden: {order._id}
      </Text>

      {order.isPaid ? (
        <Tag colorScheme="green" my={2} size="md" variant="outline">
          <TagLeftIcon as={MdCreditScore} fontSize="lg" />
          <TagLabel>Orden ya fue pagada</TagLabel>
        </Tag>
      ) : (
        <Tag colorScheme="red" my={2} size="md" variant="outline">
          <TagLeftIcon as={MdOutlineCreditCardOff} fontSize="lg" />
          <TagLabel>Pendiente de pago</TagLabel>
        </Tag>
      )}

      <Stack className="fadeIn" direction={["column", "column", "row"]}>
        <Stack direction="column" flex={1}>
          <CartList editable={false} products={order.orderItems} />
        </Stack>
        <Divider display={["flex", "flex", "none"]} pt={3} />
        <Container maxW={["100%", "100%", "45%"]} p={{base: "15px 0 0 0", md: "15px 0 0 15px"}}>
          <Stack
            border="1px solid rgba(0, 0, 0, 0.1)"
            borderRadius="10px"
            boxShadow="0px 5px 5px rgba(0, 0, 0, 0.2)"
            p={4}
          >
            <Text variant="h2">
              Resumen ({order.numberOfItems} {order.numberOfItems === 1 ? "producto" : "productos"})
            </Text>
            <Divider my={1} />

            <Box display="flex" justifyContent="space-between">
              <Text variant="subtitle1">Dirección de entrega</Text>
            </Box>

            <Text>
              {shippingAddress.name} {shippingAddress.lastName}
            </Text>
            <Text>
              {shippingAddress.address}{" "}
              {shippingAddress.address2 && `, ${shippingAddress.address2}`}
            </Text>

            <Text>
              {shippingAddress.city}, {shippingAddress.zipCode}
            </Text>
            <Text>{countries.find((c) => c.code === shippingAddress.country)?.name}</Text>
            <Text>{shippingAddress.phone}</Text>

            <Divider my={1} />

            <OrderSummary
              orderValues={{
                numberOfItems: order.numberOfItems,
                total: order.total,
                subTotal: order.subTotal,
                tax: order.tax,
              }}
            />

            <Box mt={3}>
              <Center className="fadeIn" display={isPaying ? "flex" : "none"}>
                <Spinner />
              </Center>
              <Box display={isPaying ? "none" : "flex"} flexDir="column">
                {order.isPaid ? (
                  <Tag
                    colorScheme="green"
                    justifyContent="center"
                    my={2}
                    p={3}
                    size="md"
                    variant="outline"
                    w="100%"
                  >
                    <TagLeftIcon as={MdCreditScore} fontSize="lg" />
                    <TagLabel>Orden pagada</TagLabel>
                  </Tag>
                ) : (
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: `${order.total}`,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order!.capture().then((details) => {
                        onOrderCompleted(details);
                      });
                    }}
                  />
                )}
              </Box>
            </Box>
          </Stack>
        </Container>
      </Stack>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const {id = ""} = query as {id: string};
  const session: any = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }
  const validUser = await dbUsers.checkUserById(session.user._id);

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  return {
    props: {
      validUser,
      order,
    },
  };
};

export default OrderPage;
