import {Box, Grid} from "@chakra-ui/react";
import {FC, useState} from "react";

import {IProduct} from "../../interfaces";
import {Pagination} from "../ui";

import {ProductCard} from "./ProductCard";

interface Props {
  products: IProduct[];
  hasPagination: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const ProductList: FC<Props> = ({
  products,
  hasPagination,
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
      {hasPagination && (
        <Pagination
          hasNextPage={hasNextPage || false}
          hasPrevPage={hasPreviousPage || false}
          imagesLoaded={isImagesLoaded || false}
          page={page || 1}
          totalPages={totalPages || 1}
          onClick={onPageChange || (() => {})}
        />
      )}
    </Box>
  );
};
