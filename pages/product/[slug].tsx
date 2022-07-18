import {useContext, useState} from "react";
import {NextPage, GetStaticPaths, GetStaticProps} from "next";
import {Box, Stack, Text, Container, Button, Tag} from "@chakra-ui/react";
import {useRouter} from "next/router";

import {ShopLayout} from "../../components/layouts";
import {ProductSlideshow, SizeSelector} from "../../components/products";
import {ItemCounter} from "../../components/ui";
import {ICartProduct, IProduct, ISize} from "../../interfaces";
import {dbProducts} from "../../database";
import {CartContext} from "../../context";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({product}) => {
  const router = useRouter();
  const {addProductToCart} = useContext(CartContext);
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct({
      ...tempCartProduct,
      size,
    });
  };

  const onChangeQuantity = (quantity: number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity,
    });
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;

    addProductToCart(tempCartProduct);
    router.push("/cart");
  };

  return (
    <ShopLayout pageDescription={product.description} title={product.title}>
      <Stack direction={{base: "column", sm: "column", md: "column", lg: "row"}} spacing={6}>
        <Container maxW="55%" p={0}>
          <ProductSlideshow images={product.images} />
        </Container>

        <Stack maxW="container.sm">
          {/* titulos */}
          <Text variant="h1">{product.title}</Text>
          <Text variant="subtitle1">{`$${product.price}`}</Text>

          {/* Cantidad */}
          <Box my={3}>
            <Text fontSize="sm" fontWeight="bold">
              Cantidad
            </Text>
            <ItemCounter
              currentValue={tempCartProduct.quantity}
              maxValue={product.inStock}
              updatedQuantity={(quantity) => onChangeQuantity(quantity)}
            />
            <SizeSelector
              selectedSize={tempCartProduct.size}
              sizes={product.sizes}
              onSelectedSize={(size) => onSelectedSize(size)}
            />
          </Box>

          {product.inStock === 0 ? (
            <Tag
              colorScheme="red"
              fontWeight="semibold"
              justifyContent="center"
              p={2}
              variant="outline"
            >
              No disponible
            </Tag>
          ) : (
            <Button colorScheme="yellow" size="sm" onClick={onAddProduct}>
              {tempCartProduct.size ? "Agregar al carrito" : "Seleccione una talla"}
            </Button>
          )}

          <Box pt={4}>
            <Text fontSize="sm" fontWeight="bold">
              Descripción
            </Text>
            <Text fontSize="sm">{product.description}</Text>
          </Box>
        </Stack>
      </Stack>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// ! No usar... SSR
// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//   const {slug = ""} = params as {slug: string};
//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async () => {
  const productsSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productsSlugs.map(({slug}) => ({params: {slug}})),
    fallback: "blocking",
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {slug = ""} = params as {slug: string};
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 86400, // 1 day
  };
};

export default ProductPage;
