import {Text} from "@chakra-ui/react";

import {ShopLayout} from "../../components/layouts";
import {ProductList} from "../../components/products";
import {FullScreenLoading} from "../../components/ui";
import {useProducts} from "../../hooks";

const KidPage = () => {
  const {products, isLoading} = useProducts("/products?gender=kid");

  return (
    <ShopLayout
      pageDescription="Encuentra los mejores productos de Tesla para niños"
      title="Tesla Shop | Niños"
    >
      <Text variant="h1">Niños</Text>
      <Text mb={2} variant="h2">
        Productos para ellos
      </Text>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
