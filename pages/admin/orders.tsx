import {Box, Link, Tag, Text} from "@chakra-ui/react";
import {BsBagCheck} from "react-icons/bs";
import NextLink from "next/link";
import useSWR from "swr";
import {AgGridReact} from "ag-grid-react";
import {GetServerSideProps, NextPage} from "next";
import {getSession} from "next-auth/react";
import {useContext, useEffect} from "react";

import {AdminLayout} from "../../components/layouts";
import {IOrder} from "../../interfaces/order";
import {FullScreenLoading} from "../../components/ui";
import {IUser} from "../../interfaces";
import {dbUsers} from "../../database";
import {AuthContext} from "../../context";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const defaultColDef = {
  width: 100,
  filter: true,
  sortable: true,
  resizable: true,
};

const columns: any = [
  {field: "id", headerName: "Orden ID", flex: 1, minWidth: 200},
  {field: "email", headerName: "Email", flex: 1, minWidth: 200},
  {field: "name", headerName: "Nombre Completo", flex: 1, minWidth: 200},
  {field: "total", headerName: "Monto Total"},
  {
    field: "isPaid",
    headerName: "Pagada",
    width: 120,
    cellRenderer: ({data}: any) => {
      return data.isPaid ? (
        <Tag
          borderRadius="15px"
          colorScheme="green"
          justifyContent="center"
          p={2}
          variant="outline"
          w="150px"
        >
          Pagada
        </Tag>
      ) : (
        <Tag
          borderRadius="15px"
          colorScheme="red"
          justifyContent="center"
          p={2}
          variant="outline"
          w="150px"
        >
          No pagada
        </Tag>
      );
    },
  },
  {field: "noProductos", headerName: "No.Productos"},
  {field: "createdAt", headerName: "Creada", flex: 1, minWidth: 200},
  {
    field: "check",
    headerName: "Ver orden",
    cellRenderer: ({data}: any) => {
      return (
        <NextLink passHref href={`/admin/orders/${data.id}`}>
          <Link target="_blank" textDecor="underline">
            Ver orden
          </Link>
        </NextLink>
      );
    },
  },
];

interface Props {
  validUser: boolean;
}

const OrdersPage: NextPage<Props> = ({validUser}) => {
  const {logoutUser} = useContext(AuthContext);
  const {data, error} = useSWR<IOrder[]>("/api/admin/orders");

  useEffect(() => {
    if (!validUser) {
      logoutUser();
    }
  }, [validUser, logoutUser]);

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
    createdAt: new Date(order.createdAt!).toLocaleString("es-AR"),
  }));

  return (
    <AdminLayout icon={<BsBagCheck />} subTitle="Mantenimiento de ordenes" title="Ordenes">
      <Box className="fadeIn ag-theme-alpine" h="calc(100vh - 170px)">
        {data?.length === 0 ? (
          <Text>No hay ordenes!</Text>
        ) : (
          <AgGridReact
            columnDefs={columns}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationAutoPageSize={true}
            rowData={rows}
            rowSelection={"single"}
          />
        )}
      </Box>
    </AdminLayout>
  );
};

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

  return {
    props: {
      validUser,
    },
  };
};

export default OrdersPage;
