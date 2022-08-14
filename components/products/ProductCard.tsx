import {FC, useMemo, useState} from "react";
import NextImage from "next/image";
import {Box, Grid, GridItem, Link, Tag, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import {motion} from "framer-motion";

import {IProduct} from "../../interfaces";

interface Props {
  product: IProduct;
  imagesLoaded: boolean;
  onImageLoaded: (imagesLoaded: boolean) => void;
}

export const ProductCard: FC<Props> = ({product, imagesLoaded, onImageLoaded}) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered ? `${product.images[1]}` : `${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      animate={{opacity: 1}}
      as={motion.div}
      initial={{opacity: 0}}
      maxW={{base: "xs", md: "lg"}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GridItem justifyContent="center">
        <NextLink passHref href={`/product/${product.slug}`} prefetch={false}>
          <Link>
            <Box display="block" position="relative">
              {product.inStock === 0 && (
                <Tag
                  backgroundColor="black"
                  borderRadius="full"
                  className="fadeIn"
                  color="white"
                  display={imagesLoaded ? "block" : "none"}
                  fontWeight="semibold"
                  p={2}
                  position="absolute"
                  right="20px"
                  top="20px"
                  zIndex={99}
                >
                  No disponible
                </Tag>
              )}
              <NextImage
                alt={product.title}
                blurDataURL="https://res.cloudinary.com/chavedo/image/upload/v1660513375/tesla-shop/png-clipart-tesla-tesla.png"
                height="550px"
                layout="intrinsic"
                placeholder="blur"
                priority={true}
                src={productImage}
                width="550px"
                onLoadingComplete={() => onImageLoaded(true)}
              />
              {/* <Image
                alt={product.title}
                as={motion.img}
                borderRadius="10px"
                className="fadeIn"
                height="350px"
                loading="lazy"
                position="relative"
                src={productImage}
                // @ts-ignore
                whileInView={() => onImageLoaded(true)}
                width="100%"
                // onLoad={() => onImageLoaded(true)}
              /> */}
            </Box>
          </Link>
        </NextLink>

        <Box className="fadeIn" display={imagesLoaded ? "block" : "none"} mt={1}>
          <Text fontWeight={700}>{product.title}</Text>
          <Text fontWeight={500}>{`$${product.price}`}</Text>
        </Box>
      </GridItem>
    </Grid>
  );
};
