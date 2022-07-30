import {IOrder} from "../interfaces";

import {ordersFaker, productsFaker, usersFaker} from "./faker";

export interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: "men" | "women" | "kid" | "unisex";
}

export interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
}

type ValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
type ValidTypes = "shirts" | "pants" | "hoodies" | "hats";

interface SeedData {
  users: SeedUser[];
  products: SeedProduct[];
}

export const initialData: SeedData = {
  users: usersFaker(),
  products: productsFaker,
};

export const generateOrders = async (): Promise<IOrder[]> => await ordersFaker();
