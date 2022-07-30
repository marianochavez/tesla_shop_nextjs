import React, {useContext, useEffect} from "react";
import {Box, Button, Image, Link} from "@chakra-ui/react";
import {AgGridReact} from "ag-grid-react";
import {MdAdd, MdOutlineCategory} from "react-icons/md";
import useSWR from "swr";
import {GetServerSideProps, NextPage} from "next";
import {getSession} from "next-auth/react";
import NextLink from "next/link";

import {IProduct} from "../../interfaces";
import {AdminLayout} from "../../components/layouts";
import {FullScreenLoading} from "../../components/ui";
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
  {
    field: "img",
    headerName: "Foto",
    cellRenderer: ({data}: any) => {
      return (
        <a href={`/product/${data.slug}`} rel="noreferrer" target="_blank">
          <Image alt={data.title} className="fadeIn" src={`/products/${data.img}`} w={50} />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Titulo",
    flex: 1,
    minWidth: 300,
    cellRenderer: ({data}: any) => {
      return (
        <NextLink passHref href={`/admin/products/${data.slug}`}>
          <Link textDecor="underline">{data.title}</Link>
        </NextLink>
      );
    },
  },
  {field: "gender", headerName: "Género"},
  {field: "type", headerName: "Tipo"},
  {field: "inStock", headerName: "Stock"},
  {field: "price", headerName: "Precio"},
  {field: "sizes", headerName: "Tallas", flex: 1, minWidth: 300},
];

interface Props {
  validUser: boolean;
}

const ProductsPage: NextPage<Props> = ({validUser}) => {
  const {logoutUser} = useContext(AuthContext);
  const {data, error} = useSWR<IProduct[]>("/api/admin/products");

  useEffect(() => {
    if (!validUser) {
      logoutUser();
    }
  }, [validUser, logoutUser]);

  if (!data && !error) {
    return <FullScreenLoading />;
  }

  const rows: any = data!.map((product) => ({
    img: product.images[0],
    title: product.title,
    slug: product.slug,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(", "),
  }));

  return (
    <AdminLayout
      icon={<MdOutlineCategory />}
      subTitle="Mantenimiento de productos"
      title={`Productos (${data?.length})`}
    >
      <Box display="flex" justifyContent="end" mb={2}>
        <NextLink passHref href="/admin/products/new">
          <Link
            _hover={{backgroundColor: "yellow.500"}}
            as={Button}
            backgroundColor="yellow.400"
            leftIcon={<MdAdd />}
            size="sm"
          >
            Crear producto
          </Link>
        </NextLink>
      </Box>
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

export default ProductsPage;
