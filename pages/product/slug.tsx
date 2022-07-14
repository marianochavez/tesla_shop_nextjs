import {Box, Stack, Text, Container, Button} from "@chakra-ui/react";

import {ShopLayout} from "../../components/layouts";
import {ProductSlideshow, SizeSelector} from "../../components/products";
import {ItemCounter} from "../../components/ui";
import {initialData} from "../../database/products";

const product = initialData.products[0];

const ProductPage = () => {
  return (
    //
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
            <ItemCounter />
            <SizeSelector
              // selectedSize={ product.sizes[2] }
              sizes={product.sizes}
            />
          </Box>

          <Button colorScheme="yellow" size="sm">
            Agregar al carrito
          </Button>

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

export default ProductPage;
