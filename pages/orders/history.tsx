import {Link, Tag, Text} from "@chakra-ui/react";
import Table from "rc-table";
import NextLink from "next/link";

import {ShopLayout} from "../../components/layouts";

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
        <Tag colorScheme="green" variant="outline">
          Pagada
        </Tag>
      ) : (
        <Tag colorScheme="red" variant="outline">
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
        <NextLink passHref href={`/orders/${params.id}`}>
          <Link textDecor="underline">Ver orden</Link>
        </NextLink>
      );
    },
  },
];

const rows: any = [
  {id: 1, fullname: "Fernando Herrera", paid: true},
  {id: 2, fullname: "Melissa Flores", paid: false},
  {id: 3, fullname: "Hernando Vallejo", paid: true},
  {id: 4, fullname: "Emin Reyes", paid: false},
  {id: 5, fullname: "Eduardo Rios", paid: false},
  {id: 6, fullname: "Natalia Herrera", paid: true},
];

const HistoryPage = () => {
  return (
    <ShopLayout pageDescription="Historial de ordenes del cliente" title="Historial de ordenes">
      <Text variant="h1">Historial de ordenes</Text>
      <Table className="order-table" columns={columns} data={rows} />
    </ShopLayout>
  );
};

export default HistoryPage;
