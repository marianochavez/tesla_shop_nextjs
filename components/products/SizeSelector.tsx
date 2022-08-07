import {Button, Stack} from "@chakra-ui/react";
import {FC} from "react";

import {ISize} from "../../interfaces";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  onSelectedSize: (size: ISize) => void;
}

export const SizeSelector: FC<Props> = ({selectedSize, sizes, onSelectedSize}) => {
  return (
    <Stack direction="row" justifyContent="space-between" mx={10} my={3}>
      {sizes.map((size) => (
        <Button
          key={size}
          _hover={{backgroundColor: "blackAlpha.700"}}
          backgroundColor={selectedSize === size ? "blackAlpha.700" : "white"}
          color={selectedSize === size ? "white" : "black"}
          size="sm"
          variant="ghost"
          onClick={() => onSelectedSize(size)}
        >
          {size}
        </Button>
      ))}
    </Stack>
  );
};
