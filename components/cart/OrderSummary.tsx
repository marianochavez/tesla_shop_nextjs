import {Stack, Text} from "@chakra-ui/react";
import {useContext} from "react";

import {CartContext} from "../../context";
import {currency} from "../../utils";

export const OrderSummary = () => {
  const {numberOfItems, subTotal, total, tax} = useContext(CartContext);

  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-between">
        <Text>No. Productos</Text>
        <Text>
          {numberOfItems} {numberOfItems > 1 ? "productos" : "producto"}
        </Text>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Text>SubTotal</Text>
        <Text>{currency.format(subTotal)}</Text>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Text>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Text>
        <Text>{currency.format(tax)}</Text>
      </Stack>
      <Stack direction="row" fontWeight="bold" justifyContent="space-between" py={4}>
        <Text>Total:</Text>
        <Text>{currency.format(total)}</Text>
      </Stack>
    </Stack>
  );
};
