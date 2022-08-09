import {useState} from "react";

import {IProduct} from "../interfaces";

export const usePagination = (products: IProduct[]) => {
  const [page, setPage] = useState(1);
  const productsPerPage = 6;

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setPage(pageNumber);

  const hasNextPage = page < Math.ceil(products.length / productsPerPage);
  const hasPreviousPage = page > 1;
  const totalPages = Math.ceil(products.length / productsPerPage);

  return {
    currentProducts,
    hasNextPage,
    hasPreviousPage,
    page,
    paginate,
    totalPages,
  };
};
