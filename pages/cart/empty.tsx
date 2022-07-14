import {Box, Link, Text} from "@chakra-ui/react";
import {MdOutlineRemoveShoppingCart} from "react-icons/md";
import NextLink from "next/link";

import {ShopLayout} from "../../components/layouts/ShopLayout";

const EmptyPage = () => {
  return (
    <ShopLayout pageDescription="No hay artículos en el carrito de compras" title="Carrito vacío">
      <Box
        alignItems="center"
        display="flex"
        flexDirection={{xs: "column", sm: "row"}}
        h="calc(100vh - 200px)"
        justifyContent="center"
      >
        <MdOutlineRemoveShoppingCart fontSize={100} />
        <Box alignItems="center" display="flex" flexDirection="column">
          <Text>Su carrito está vacío</Text>
          <NextLink passHref href="/">
            <Link color="red.700" fontSize="3xl">
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
