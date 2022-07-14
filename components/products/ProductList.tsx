import {Grid} from "@chakra-ui/react";
import {FC} from "react";

import {IProduct} from "../../interfaces";

import {ProductCard} from "./ProductCard";

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({products}) => {
  return (
    <Grid
      gap={6}
      templateColumns={{sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
    >
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};
