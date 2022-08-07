import type {NextApiRequest, NextApiResponse} from "next";

import {db, SHOP_CONSTANTS} from "../../../database";
import {IProduct} from "../../../interfaces";
import {Product} from "../../../models";

export type Data =
  | {message: string}
  | IProduct[]
  | {
      products: IProduct[];
      totalProducts: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      page: number;
      totalPages: number;
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    default:
      return res.status(400).json({message: "Method not allowed"});
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {p = "", gender = "all"} = req.query;
  const limit = 6;

  let condition = {};

  if (gender !== "all" && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
    condition = {gender};
  }

  await db.connect();

  if (p.length > 0) {
    const [products, totalProducts] = await Promise.all([
      Product.find(condition)
        .skip((+p - 1) * limit)
        .limit(limit)
        .select("title images price inStock slug -_id")
        .lean(),
      Product.countDocuments(condition),
    ]);

    const updatedProducts: IProduct[] = products.map((product) => {
      // Display image correctly from cloudinary or local
      product.images = product.images.map((image) => {
        return image.includes("http") ? image : `${process.env.HOST_NAME}/products/${image}`;
      });

      return product;
    });

    await db.disconnect();

    const totalPages = Math.ceil(totalProducts / limit);
    const hasPrevPage = +p > 1;
    const hasNextPage = +p < totalPages;
    const page = +p;

    return res.status(200).json({
      totalProducts,
      hasPrevPage,
      hasNextPage,
      page,
      totalPages,
      products: updatedProducts,
    });
  }

  const products = await Product.find(condition)
    .select("title images price inStock slug -_id")
    .lean();

  await db.disconnect();
  const updatedProducts: IProduct[] = products.map((product) => {
    // Display image correctly from cloudinary or local
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.HOST_NAME}/products/${image}`;
    });

    return product;
  });

  return res.status(200).json(updatedProducts);
};
