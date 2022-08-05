import {FC, useContext} from "react";
import NextLink from "next/link";
import {Box, Button, Image, Link, Stack, Text} from "@chakra-ui/react";

import {ItemCounter} from "../ui";
import {CartContext} from "../../context";
import {IOrderItem, ICartProduct} from "../../interfaces";

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({editable = false, products}) => {
  const {cart, updateCartQuantity, removeCartProduct} = useContext(CartContext);

  const onNewCartQauntity = (product: ICartProduct, newQuantity: number) => {
    product.quantity = newQuantity;
    updateCartQuantity(product);
  };

  const productsToShow = products ? products : cart;

  return (
    <>
      {productsToShow.map((product) => (
        <Stack key={product.slug + product.size} direction="row" mb={2} spacing={2}>
          <Box>
            <NextLink passHref href={`${product.slug}`}>
              <Link>
                <Box>
                  <Image
                    alt={product.title}
                    borderRadius="5px"
                    h={170}
                    src={`${product.image}`}
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
                Talla: <strong>{product.size}</strong>
              </Text>
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  updatedQuantity={(value) => onNewCartQauntity(product as ICartProduct, value)}
                />
              ) : (
                <Text variant="h5">
                  {product.quantity} {product.quantity > 1 ? "productos" : "producto"}
                </Text>
              )}
            </Stack>
            <Stack alignItems="center">
              <Text variant="subtitle1">{`$${product.price}`}</Text>

              {editable && (
                <Button
                  colorScheme="red"
                  size="sm"
                  variant="ghost"
                  onClick={() => removeCartProduct(product as ICartProduct)}
                >
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
