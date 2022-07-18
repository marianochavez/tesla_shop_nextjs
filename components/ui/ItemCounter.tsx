import {Text, Stack, Button} from "@chakra-ui/react";
import {FC} from "react";
import {AiOutlineMinusCircle, AiOutlinePlusCircle} from "react-icons/ai";

interface Props {
  currentValue: number;
  maxValue: number;

  updatedQuantity: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({currentValue, updatedQuantity, maxValue}) => {
  const handleIncrementCounter = () => {
    if (currentValue === maxValue) return;
    updatedQuantity(currentValue + 1);
  };
  const handleDecrementCounter = () => {
    if (currentValue <= 1) return;
    updatedQuantity(currentValue - 1);
  };

  return (
    <Stack alignItems="center" direction="row" ml={2}>
      <Button p={0} size="sm" variant="ghost" onClick={handleDecrementCounter}>
        <AiOutlineMinusCircle fontSize="20px" />
      </Button>
      <Text p={0} px={2} textAlign="center">
        {currentValue}
      </Text>
      <Button p={0} size="sm" variant="ghost" onClick={handleIncrementCounter}>
        <AiOutlinePlusCircle fontSize="20px" />
      </Button>
    </Stack>
  );
};
