import {Box, Link, Tag} from "@chakra-ui/react";
import Table from "rc-table";
import {BsBagCheck} from "react-icons/bs";
import NextLink from "next/link";
import useSWR from "swr";

import {AdminLayout} from "../../components/layouts";
import {IOrder} from "../../interfaces/order";
import {FullScreenLoading} from "../../components/ui";
import {IUser} from "../../interfaces";

const columns: any = [
  {
    key: "id",
    title: "Orden ID",
    dataIndex: "id",
    width: 300,
    align: "left",
    className: "order-table-column",
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
    width: 300,
    align: "left",
    className: "order-table-column",
  },
  {
    key: "name",
    title: "Nombre Completo",
    dataIndex: "name",
    width: 300,
    align: "left",
    className: "order-table-column",
  },
  {
    key: "total",
    title: "Monto Total",
    dataIndex: "total",
    width: 300,
    align: "left",
    className: "order-table-column",
  },
  {
    key: "isPaid",
    title: "Pagada",
    width: 300,
    align: "center",
    className: "order-table-column",
    render: (params: any) => {
      return params.isPaid ? (
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
    key: "noProductos",
    title: "No.Productos",
    dataIndex: "noProductos",
    width: 300,
    align: "center",
    className: "order-table-column",
  },
  {
    key: "createdAt",
    title: "Creada",
    dataIndex: "createdAt",
    width: 300,
    align: "left",
    className: "order-table-column",
  },
  {
    key: "check",
    title: "Ver orden",
    width: 300,
    align: "left",
    className: "order-table-column",
    render: (params: any) => {
      return (
        <NextLink passHref href={`/admin/orders/${params.id}`}>
          <Link target="_blank" textDecor="underline">
            Ver orden
          </Link>
        </NextLink>
      );
    },
  },
];

const OrdersPage = () => {
  const {data, error} = useSWR<IOrder[]>("/api/admin/orders");

  if (!data && !error) {
    return <FullScreenLoading />;
  }

  const rows: any = data!.map((order) => ({
    key: order._id,
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProductos: order.numberOfItems,
    createdAt: new Date(order.createdAt!).toLocaleDateString("es-AR"),
  }));

  return (
    <AdminLayout icon={<BsBagCheck />} subTitle="Mantenimiento de ordenes" title="Ordenes">
      <Box className="fadeIn">
        <Table className="order-table" columns={columns} data={rows} />
      </Box>
    </AdminLayout>
  );
};

export default OrdersPage;
