import type {NextPage} from "next";

import {GetStaticProps} from "next";
import {Box, Text} from "@chakra-ui/react";
import {motion} from "framer-motion";

import {ShopLayout} from "../components/layouts";
import {ProductListClientPagination} from "../components/products";
import {dbProducts} from "../database";
import {IProduct} from "../interfaces";

interface Props {
  products: IProduct[];
}

const HomePage: NextPage<Props> = ({products}) => {
  // * server side method
  // const [page, setPage] = useState(1);
  // const {data, isLoading} = useProducts(`/products?p=${page}`);
  // const {products, hasNextPage, hasPrevPage, totalPages} = data as IProductData;

  return (
    <ShopLayout
      pageDescription={"Encuentra los mejores productos de Tesla aquí"}
      title={"Tesla Shop | Home"}
    >
      <Box className="back-image">
        <motion.img
          alt="Tesla shop"
          animate={{scale: 1, opacity: 1}}
          draggable={false}
          initial={{scale: 1.2, opacity: 0}}
          src="https://res.cloudinary.com/chavedo/image/upload/v1660237607/tesla-shop/spaceX.webp"
          // @ts-ignore - This is a valid motion prop
          transition={{duration: 1}}
        />

        <Text
          animate={{opacity: 1, y: 0}}
          as={motion.p}
          color="white"
          fontFamily="mono"
          fontSize={["2xl", "2xl", "2xl", "4xl", "6xl"]}
          fontWeight="bold"
          initial={{opacity: 0, y: -100}}
          position="absolute"
          transition="1s linear"
        >
          TESLA SHOP
        </Text>
      </Box>
      <ProductListClientPagination products={products} />

      {/* Server side method */}
      {/* {isLoading ? (
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
      )} */}
    </ShopLayout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const products = await dbProducts.getAllProducts();

  return {
    props: {
      products,
    },
    revalidate: 86400, // 1 day
  };
};
