import useSWR, {SWRConfiguration} from "swr";

import {IProduct} from "../interfaces";

interface ResProducts {
  message: string;
  products: IProduct[];
}

// const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  // const {data, error} = useSWR<ResProducts>(`/api${url}`, fetcher, config);
  const {data, error} = useSWR<ResProducts>(`/api${url}`, config);

  return {
    products: data?.products || [],
    isLoading: !error && !data,
    isError: error,
  };
};
