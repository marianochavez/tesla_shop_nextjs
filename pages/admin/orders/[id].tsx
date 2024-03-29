import {GetServerSideProps, NextPage} from "next";
import {Container, Stack, Tag, TagLabel, TagLeftIcon, Text} from "@chakra-ui/react";
import {MdCreditScore, MdOutlineCreditCardOff, MdOutlineSummarize} from "react-icons/md";
import {Divider, Box} from "@chakra-ui/react";

import {CartList, OrderSummary} from "../../../components/cart";
import {dbOrders} from "../../../database";
import {IOrder, IUser} from "../../../interfaces";
import {countries} from "../../../utils";
import {AdminLayout} from "../../../components/layouts";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({order}) => {
  const {shippingAddress} = order;

  // format date - time
  const formatDate = (date: string = "123") => {
    const formattedDate = new Date(date);

    return formattedDate.toLocaleString("es-ES");
  };

  return (
    <AdminLayout
      icon={<MdOutlineSummarize />}
      subTitle={`Orden: ${order._id}`}
      title="Resumen de la orden"
    >
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

            <Box display="flex" flexDir="column">
              <Text variant="subtitle1">Usuario</Text>
              <Text>{(order.user as IUser).email}</Text>
              <Text>{(order.user as IUser).name}</Text>
              <Text>{(order.user as IUser).role}</Text>
            </Box>

            <Box display="flex" flexDir="column">
              <Text variant="subtitle1">Orden creada</Text>
              <Text>{formatDate(order.createdAt)}</Text>
            </Box>

            <Box display="flex" flexDir="column">
              <Text variant="subtitle1">Orden actualizada</Text>
              <Text>{formatDate(order.updatedAt)}</Text>
            </Box>

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
              <Box flexDir="column">
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
                  <Tag
                    colorScheme="red"
                    justifyContent="center"
                    my={2}
                    p={3}
                    size="md"
                    variant="outline"
                    w="100%"
                  >
                    <TagLeftIcon as={MdOutlineCreditCardOff} fontSize="lg" />
                    <TagLabel>Pendiente de pago</TagLabel>
                  </Tag>
                )}
              </Box>
            </Box>
          </Stack>
        </Container>
      </Stack>
    </AdminLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {id = ""} = query as {id: string};

  const order = await dbOrders.getOrderById(id.toString(), true);

  if (!order) {
    return {
      redirect: {
        destination: "/admin/orders",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
