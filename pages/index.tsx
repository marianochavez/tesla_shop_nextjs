import type {NextPage} from "next";

import {Box, Image} from "@chakra-ui/react";
import {useState} from "react";
import {motion} from "framer-motion";

import {ShopLayout} from "../components/layouts";
import {ProductList} from "../components/products";
import {FullScreenLoading} from "../components/ui";
import {IProductData, useProducts} from "../hooks";

const HomePage: NextPage = () => {
  const [page, setPage] = useState(1);
  const {data, isLoading} = useProducts(`/products?p=${page}`);
  const {products, hasNextPage, hasPrevPage, totalPages} = data as IProductData;

  return (
    <ShopLayout
      pageDescription={"Encuentra los mejores productos de Tesla aquí"}
      title={"Tesla Shop | Home"}
    >
      <Box
        alignItems="center"
        background="black"
        display="flex"
        justifyContent="center"
        m="-20px 0"
        mb="-50px"
        ml="50%"
        overflow="hidden"
        pb={10}
        transform="translateX(-50%)"
        userSelect="none"
        w="calc(100vw - 15px)"
      >
        <Image
          alt="Model S"
          animate={{scale: 1.5, opacity: 1}}
          as={motion.img}
          draggable={false}
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          maxW={["100%", "100%", "100%", "60%", "40%"]}
          src={
            "https://res.cloudinary.com/chavedo/image/upload/v1660059029/tesla-shop/Model-S-Specs-Hero-Desktop-LHD-Res.jpg"
          }
          // @ts-ignore
          transition="2s linear"
        />
      </Box>
      {isLoading ? (
        <Box pt="30px">
          <FullScreenLoading />
        </Box>
      ) : (
        <ProductList
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPrevPage}
          page={page}
          products={products}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </ShopLayout>
  );
};

export default HomePage;
