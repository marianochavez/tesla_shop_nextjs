import {GetServerSideProps, NextPage} from "next";
import {Box, Link, Tag, Text} from "@chakra-ui/react";
import Table from "rc-table";
import NextLink from "next/link";
import {getSession} from "next-auth/react";

import {ShopLayout} from "../../components/layouts";
import {dbOrders} from "../../database";
import {IOrder} from "../../interfaces";

const columns: any = [
  {
    key: "id",
    title: "ID",
    dataIndex: "id",
    width: 100,
    align: "left",
    className: "order-table-column",
  },
  {
    key: "fullname",
    dataIndex: "fullname",
    title: "Nombre Completo",
    width: 300,
    align: "left",
    className: "order-table-column",
  },
  {
    key: "paid",
    title: "Pagada",
    width: 200,
    align: "left",
    className: "order-table-column",
    render: (params: any) => {
      return params.paid ? (
        <Tag borderRadius="15px" colorScheme="green" p={2} variant="outline">
          Pagada
        </Tag>
      ) : (
        <Tag borderRadius="15px" colorScheme="red" p={2} variant="outline">
          No pagada
        </Tag>
      );
    },
  },
  {
    key: "orden",
    title: "Ver orden",
    width: 200,
    sortable: false,
    align: "left",
    className: "order-table-column",
    render: (params: any) => {
      return (
        <NextLink passHref href={`/orders/${params.orderId}`}>
          <Link textDecor="underline">Ver orden</Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({orders}) => {
  const rows: any = orders.map((order, i) => ({
    id: i + 1,
    key: order._id,
    fullname: `${order.shippingAddress.name} ${order.shippingAddress.lastName}`,
    paid: order.isPaid,
    orderId: order._id,
  }));

  return (
    <ShopLayout pageDescription="Historial de ordenes del cliente" title="Historial de ordenes">
      <Text variant="h1">Historial de ordenes</Text>
      <Box className="fadeIn">
        <Table className="order-table" columns={columns} data={rows} />
      </Box>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const session: any = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: "auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
