import {Text, Stack} from "@chakra-ui/react";

import {ShopLayout} from "../components/layouts";

const Custom404 = () => {
  return (
    <ShopLayout pageDescription="No hay nada que mostrar aquí" title="Página no encontrada">
      <Stack
        alignItems="center"
        direction={{base: "column", md: "row"}}
        height="calc(100vh - 200px)"
        justifyContent="center"
      >
        <Text fontSize={80} fontWeight={200} variant="h1">
          404 |
        </Text>
        <Text ml={2}>No encontramos ninguna página aquí</Text>
      </Stack>
    </ShopLayout>
  );
};

export default Custom404;
