import {Text} from "@chakra-ui/react";

import {ShopLayout} from "../../components/layouts";
import {ProductList} from "../../components/products";
import {FullScreenLoading} from "../../components/ui";
import {useProducts} from "../../hooks";

const MenPage = () => {
  const {products, isLoading} = useProducts("/products?gender=men");

  return (
    <ShopLayout
      pageDescription="Encuentra los mejores productos de Tesla para hombres"
      title="Tesla Shop | Hombres"
    >
      <Text variant="h1">Hombres</Text>
      <Text mb={2} variant="h2">
        Productos para ellos
      </Text>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
