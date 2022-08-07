import type {NextPage} from "next";

import {Text} from "@chakra-ui/react";
import {useState} from "react";

import {ShopLayout} from "../components/layouts";
import {ProductList} from "../components/products";
import {FullScreenLoading} from "../components/ui";
import {IProductData, useProducts} from "../hooks";

const HomePage: NextPage = () => {
  const [page, setPage] = useState(1);
  const {data, isLoading} = useProducts(`/products?p=${page}`);
  const {products, hasNextPage, hasPrevPage, totalPages} = data as IProductData;

  return (
    <ShopLayout
      pageDescription={"Encuentra los mejores productos de Tesla aquí"}
      title={"Tesla Shop | Home"}
    >
      <Text variant="h1">Tienda</Text>
      <Text mb={2} variant="h2">
        Todos los productos
      </Text>

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList
          hasNextPage={hasNextPage}
          hasPagination={true}
          hasPreviousPage={hasPrevPage}
          page={page}
          products={products}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </ShopLayout>
  );
};

export default HomePage;
