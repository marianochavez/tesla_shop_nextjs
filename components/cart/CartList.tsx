import {FC} from "react";
import NextLink from "next/link";
import {Box, Button, Image, Link, Stack, Text} from "@chakra-ui/react";

import {initialData} from "../../database/products";
import {ItemCounter} from "../ui";

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({editable = false}) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Stack key={product.slug} direction="row" mb={2} spacing={2}>
          <Box>
            {/* TODO: llevar a la pagina del producto */}
            <NextLink passHref href="/product/slug">
              <Link>
                <Box>
                  <Image
                    alt={product.title}
                    borderRadius="5px"
                    h={170}
                    src={`/products/${product.images[0]}`}
                    w={170}
                  />
                </Box>
              </Link>
            </NextLink>
          </Box>
          <Stack direction="row" flex={1} justifyContent="space-between">
            <Stack direction="column">
              <Text>{product.title}</Text>
              <Text>
                Talla: <strong>M</strong>
              </Text>
              {editable ? <ItemCounter /> : <Text variant="h5">3 items</Text>}
            </Stack>
            <Stack alignItems="center">
              <Text variant="subtitle1">{`$${product.price}`}</Text>

              {editable && (
                <Button colorScheme="red" size="sm" variant="ghost">
                  Remover
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      ))}
    </>
  );
};
