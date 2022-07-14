import {Icon, Text, Stack} from "@chakra-ui/react";
import {FC} from "react";
import {AiOutlineMinusCircle, AiOutlinePlusCircle} from "react-icons/ai";

interface Props {}

export const ItemCounter: FC<Props> = () => {
  return (
    <Stack alignItems="center" direction="row" fontSize="xl" gap={2} ml={2}>
      <Icon as={AiOutlineMinusCircle} />
      <Text textAlign="center" w={4}>
        1
      </Text>
      <Icon as={AiOutlinePlusCircle} />
    </Stack>
  );
};
