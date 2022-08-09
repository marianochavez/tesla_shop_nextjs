import type {NextPage} from "next";

import {GetServerSideProps} from "next";
import {Text} from "@chakra-ui/react";

import {ShopLayout} from "../../components/layouts";
import {ProductListClientPagination} from "../../components/products";
import {dbProducts} from "../../database";
import {IProduct} from "../../interfaces/products";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({products, foundProducts, query}) => {
  return (
    <ShopLayout
      pageDescription={"Encuentra los mejores productos de Tesla aquí"}
      title={"Tesla Shop | Buscar"}
    >
      <Text variant="h1">Buscar productos</Text>

      {foundProducts ? (
        <>
          <Text mb={2} textTransform="capitalize" variant="h2">
            {`Para "${query}"`}
          </Text>
          {/* <ProductList hasPagination={false} products={products} /> */}
          <ProductListClientPagination products={products} />
        </>
      ) : (
        <Text mb={2} variant="h2">
          {`No se encontraron productos para "${query}"`}
        </Text>
      )}
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const {query = ""} = params as {query: string};

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  // if (!foundProducts) {
  //   products = await dbProducts.getAllProducts();
  // }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
