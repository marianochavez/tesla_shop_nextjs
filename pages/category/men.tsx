import {useState} from "react";
import {Text} from "@chakra-ui/react";

import {ShopLayout} from "../../components/layouts";
import {ProductList} from "../../components/products";
import {FullScreenLoading} from "../../components/ui";
import {IProductData, useProducts} from "../../hooks";

const MenPage = () => {
  const [page, setPage] = useState(1);
  const {data, isLoading} = useProducts(`/products?p=${page}&gender=men`);
  const {products, hasNextPage, hasPrevPage, totalPages} = data as IProductData;

  return (
    <ShopLayout
      pageDescription="Encuentra los mejores productos de Tesla para hombres"
      title="Tesla Shop | Hombres"
    >
      <Text variant="h1">Hombres</Text>
      <Text mb={2} variant="h2">
        Productos para ellos
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

export default MenPage;
