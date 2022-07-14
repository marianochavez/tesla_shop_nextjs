import type {NextPage} from "next";

import {Text} from "@chakra-ui/react";

import {ShopLayout} from "../components/layouts";
import {ProductList} from "../components/products";
import {initialData} from "../database/products";

const Home: NextPage = () => {
  return (
    <ShopLayout
      pageDescription={"Encuentra los mejores productos de Teslo aquí"}
      title={"Tesla Shop | Home"}
    >
      <Text variant="h1">Tienda</Text>
      <Text mb={2} variant="h2">
        Todos los productos
      </Text>

      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
};

export default Home;
