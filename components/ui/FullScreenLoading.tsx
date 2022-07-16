import {Spinner, Stack, Text} from "@chakra-ui/react";

export const FullScreenLoading = () => {
  return (
    <Stack
      alignItems="center"
      direction="column"
      height="calc(100vh - 200px)"
      justifyContent="center"
    >
      <Text fontSize={20} fontWeight={200} variant="h2">
        Cargando...
      </Text>
      <Spinner color="red.700" emptyColor="gray.200" size="xl" speed="0.65s" thickness="4px" />
    </Stack>
  );
};
