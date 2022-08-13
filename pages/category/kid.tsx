import type {GetStaticProps, NextPage} from "next";

import {Text} from "@chakra-ui/react";

import {ShopLayout} from "../../components/layouts";
import {ProductListClientPagination} from "../../components/products";
import {dbProducts} from "../../database";
import {IProduct} from "../../interfaces";

interface Props {
  products: IProduct[];
}

const KidPage: NextPage<Props> = ({products}) => {
  // * server side method
  // const [page, setPage] = useState(1);
  // const {data, isLoading} = useProducts(`/products?p=${page}&gender=kid`);
  // const {products, hasNextPage, hasPrevPage, totalPages} = data as IProductData;

  return (
    <ShopLayout
      pageDescription="Encuentra los mejores productos de Tesla para niños"
      title="Tesla Shop | Niños"
    >
      <Text variant="h1">Niños</Text>
      <Text mb={2} variant="h2">
        Productos para ellos
      </Text>

      <ProductListClientPagination products={products} />

      {/* Server side method */}
      {/* {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPrevPage}
          page={page}
          products={products}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )} */}
    </ShopLayout>
  );
};

export default KidPage;

export const getStaticProps: GetStaticProps = async () => {
  const products = await dbProducts.getAllProductsByCategory("kid");

  return {
    props: {
      products,
    },
    revalidate: 86400, // 1 day
  };
};
