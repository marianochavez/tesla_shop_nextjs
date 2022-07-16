import type {NextPage} from "next";

import {Text} from "@chakra-ui/react";

import {ShopLayout} from "../components/layouts";
import {ProductList} from "../components/products";
import {FullScreenLoading} from "../components/ui";
import {useProducts} from "../hooks";

const HomePage: NextPage = () => {
  const {products, isLoading} = useProducts("/products");

  return (
    <ShopLayout
      pageDescription={"Encuentra los mejores productos de Tesla aquí"}
      title={"Tesla Shop | Home"}
    >
      <Text variant="h1">Tienda</Text>
      <Text mb={2} variant="h2">
        Todos los productos
      </Text>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
