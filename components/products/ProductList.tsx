import {Grid} from "@chakra-ui/react";
import {FC} from "react";

import {IProduct} from "../../interfaces";

import {ProductCard} from "./ProductCard";

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({products}) => {
  return (
    <Grid gap={4}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </Grid>
  );
};
