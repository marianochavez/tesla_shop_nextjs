import {Text} from "@chakra-ui/react";

import {ShopLayout} from "../../components/layouts";
import {ProductList} from "../../components/products";
import {FullScreenLoading} from "../../components/ui";
import {useProducts} from "../../hooks";

const WomenPage = () => {
  const {products, isLoading} = useProducts("/products?gender=women");

  return (
    <ShopLayout
      pageDescription="Encuentra los mejores productos de Tesla para mujeres"
      title="Tesla Shop | Mujeres"
    >
      <Text variant="h1">Mujeres</Text>
      <Text mb={2} variant="h2">
        Productos para ellas
      </Text>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
