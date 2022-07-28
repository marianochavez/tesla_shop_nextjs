import React, {FC} from "react";
import {Box, GridItem, Text} from "@chakra-ui/react";

interface Props {
  title: string | number;
  subTitle: string;
  icon: JSX.Element;
}

export const SummaryTitle: FC<Props> = ({title, subTitle, icon}) => {
  return (
    <GridItem borderRadius="10px" boxShadow="md" display="flex" flexDir="row" p={2}>
      <Box alignItems="center" display="flex" justifyContent="center" w={20}>
        {/* <Icon as={} color="blue.600" fontSize={50} /> */}
        {icon}
      </Box>
      <Box alignItems="center" display="flex" flex={1} flexDir="column" justifyContent="center">
        <Text variant="h1">{title}</Text>
        <Text fontSize="sm">{subTitle}</Text>
      </Box>
    </GridItem>
  );
};
