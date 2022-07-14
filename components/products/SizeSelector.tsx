import {Button, Stack} from "@chakra-ui/react";
import {FC} from "react";

import {ISize} from "../../interfaces";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({selectedSize, sizes}) => {
  return (
    <Stack direction="row" justifyContent="space-between" mx={10} my={3}>
      {sizes.map((size) => (
        <Button
          key={size}
          color={selectedSize === size ? "primary" : "info"}
          size="sm"
          variant="ghost"
        >
          {size}
        </Button>
      ))}
    </Stack>
  );
};
