import {FC, useMemo, useState} from "react";
import {Box, Grid, Image, Link, Text} from "@chakra-ui/react";
import NextLink from "next/link";

import {IProduct} from "../../interfaces";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({product}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHovered ? `/products/${product.images[1]}` : `/products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Box>
        <NextLink passHref href={`/product/${product.slug}`} prefetch={false}>
          <Link>
            <Image
              alt={product.title}
              borderRadius="10px"
              className="fadeIn"
              src={productImage}
              onLoad={() => setIsImageLoaded(true)}
            />
          </Link>
        </NextLink>
      </Box>

      <Box className="fadeIn" display={isImageLoaded ? "block" : "none"} mt={1}>
        <Text fontWeight={700}>{product.title}</Text>
        <Text fontWeight={500}>{`$${product.price}`}</Text>
      </Box>
    </Grid>
  );
};
