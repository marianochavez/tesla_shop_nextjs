import {Stack, Text} from "@chakra-ui/react";

export const OrderSummary = () => {
  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-between">
        <Text>No. Productos</Text>
        <Text>3 items</Text>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Text>SubTotal</Text>
        <Text>{`$${155.36}`}</Text>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Text>Impuestos (15%)</Text>
        <Text>{`$${35.34}`}</Text>
      </Stack>
      <Stack direction="row" fontWeight="bold" justifyContent="space-between" py={4}>
        <Text>Total:</Text>
        <Text>{`$${186.34}`}</Text>
      </Stack>
    </Stack>
  );
};
