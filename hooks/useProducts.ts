import useSWR, {SWRConfiguration} from "swr";

import {IProduct} from "../interfaces";

export interface IProductData {
  products: IProduct[];
  totalProducts: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page: number;
  totalPages: number;
}

// const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  // const {data, error} = useSWR<ResProducts>(`/api${url}`, fetcher, config);
  const {data, error} = useSWR<IProductData>(`/api${url}`, config);

  return {
    data: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
