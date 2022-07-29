import {useContext, useEffect} from "react";
import {GetServerSideProps, NextPage} from "next";
import {Box, Link, Tag, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import {getSession} from "next-auth/react";
import {AgGridReact} from "ag-grid-react";

import {ShopLayout} from "../../components/layouts";
import {dbOrders, dbUsers} from "../../database";
import {IOrder} from "../../interfaces";
import {AuthContext} from "../../context";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const defaultColDef = {
  width: 200,
  filter: true,
  sortable: true,
  resizable: true,
};

const columns: any = [
  {field: "id", headerName: "ID"},
  {field: "fullname", headerName: "Nombre Completo", flex: 1, minWidth: 200},
  {
    field: "paid",
    headerName: "Pagada",
    flex: 1,
    minWidth: 200,
    cellRenderer: ({data}: any) => {
      return data.paid ? (
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
    field: "orden",
    headerName: "Ver orden",

    cellRenderer: ({data}: any) => {
      return (
        <NextLink passHref href={`/orders/${data.orderId}`}>
          <Link textDecor="underline">Ver orden</Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  validUser: boolean;
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({validUser, orders}) => {
  const {logoutUser} = useContext(AuthContext);

  useEffect(() => {
    if (!validUser) {
      logoutUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validUser]);

  const rows: any = orders.map((order, i) => ({
    id: i + 1,
    key: order._id,
    fullname: `${order.shippingAddress.name} ${order.shippingAddress.lastName}`,
    paid: order.isPaid,
    orderId: order._id,
  }));

  return (
    <ShopLayout pageDescription="Historial de ordenes del cliente" title="Historial de ordenes">
      <Text fontSize="2xl" fontWeight="bold">
        Historial de ordenes
      </Text>
      <Box className="fadeIn ag-theme-alpine" h="calc(100vh - 170px)">
        <AgGridReact
          columnDefs={columns}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationAutoPageSize={true}
          rowData={rows}
          rowSelection={"single"}
        />
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
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const validUser = await dbUsers.checkUserById(session.user._id);
  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      validUser,
      orders,
    },
  };
};

export default HistoryPage;
