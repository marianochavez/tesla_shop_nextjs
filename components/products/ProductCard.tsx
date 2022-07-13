import {FC, useMemo, useState} from "react";
import {Grid} from "@chakra-ui/react";

import {IProduct} from "../../interfaces";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({product}) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered ? `products/${product.images[1]}` : `products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return <Grid onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    <Card></Card>
  </Grid>;
};
