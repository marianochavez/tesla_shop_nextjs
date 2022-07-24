import {Stack, Text} from "@chakra-ui/react";
import {FC, useContext} from "react";

import {CartContext} from "../../context";
import {currency} from "../../utils";

interface Props {
  orderValues?: {
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
  };
}

export const OrderSummary: FC<Props> = ({orderValues}) => {
  const {numberOfItems, subTotal, total, tax} = useContext(CartContext);
  const summaryValues = orderValues
    ? orderValues
    : {
        numberOfItems,
        subTotal,
        tax,
        total,
      };

  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-between">
        <Text>No. Productos</Text>
        <Text>
          {summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? "productos" : "producto"}
        </Text>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Text>SubTotal</Text>
        <Text>{currency.format(summaryValues.subTotal)}</Text>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Text>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Text>
        <Text>{currency.format(summaryValues.tax)}</Text>
      </Stack>
      <Stack direction="row" fontWeight="bold" justifyContent="space-between" py={4}>
        <Text>Total:</Text>
        <Text>{currency.format(summaryValues.total)}</Text>
      </Stack>
    </Stack>
  );
};
