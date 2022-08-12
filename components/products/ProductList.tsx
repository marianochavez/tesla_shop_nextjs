import {Box, Grid} from "@chakra-ui/react";
import {FC, useState} from "react";

import {usePagination} from "../../hooks";
import {IProduct} from "../../interfaces";
import {Pagination} from "../ui";

import {ProductCard} from "./ProductCard";

type ProductListProps = {
  products: IProduct[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type ProductListClientProps = {
  products: IProduct[];
};

export const ProductListClientPagination: FC<ProductListClientProps> = ({products}) => {
  const {currentProducts, page, hasNextPage, hasPreviousPage, paginate, totalPages} =
    usePagination(products);

  return (
    <ProductList
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      page={page}
      products={currentProducts}
      totalPages={totalPages}
      onPageChange={paginate}
    />
  );
};

export const ProductList: FC<ProductListProps> = ({
  products,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  page,
  totalPages,
}) => {
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  return (
    <Box>
      <Grid
        gap={6}
        justifyContent="center"
        templateColumns={{sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
      >
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            imagesLoaded={isImagesLoaded}
            product={product}
            onImageLoaded={setIsImagesLoaded}
          />
        ))}
      </Grid>
      <Pagination
        hasNextPage={hasNextPage || false}
        hasPrevPage={hasPreviousPage || false}
        imagesLoaded={isImagesLoaded || false}
        page={page || 1}
        totalPages={totalPages || 1}
        onClick={onPageChange || (() => {})}
      />
    </Box>
  );
};
