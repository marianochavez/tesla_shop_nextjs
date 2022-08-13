import {Text} from "@chakra-ui/react";
import {GetStaticProps, NextPage} from "next";

import {ShopLayout} from "../../components/layouts";
import {ProductListClientPagination} from "../../components/products";
import {dbProducts} from "../../database";
import {IProduct} from "../../interfaces";

interface Props {
  products: IProduct[];
}

const WomenPage: NextPage<Props> = ({products}) => {
  // * server side method
  // const [page, setPage] = useState(1);
  // const {data, isLoading} = useProducts(`/products?p=${page}&gender=women`);
  // const {products, hasNextPage, hasPrevPage, totalPages} = data as IProductData;

  return (
    <ShopLayout
      pageDescription="Encuentra los mejores productos de Tesla para mujeres"
      title="Tesla Shop | Mujeres"
    >
      <Text variant="h1">Mujeres</Text>
      <Text mb={2} variant="h2">
        Productos para ellas
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

export default WomenPage;

export const getStaticProps: GetStaticProps = async () => {
  const products = await dbProducts.getAllProductsByCategory("women");

  return {
    props: {
      products,
    },
    revalidate: 86400, // 1 day
  };
};
