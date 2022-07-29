import type {NextApiRequest, NextApiResponse} from "next";

import {db} from "../../../database";
import {IProduct} from "../../../interfaces";
import {Product} from "../../../models";

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    case "POST":
    // return createProduct(req, res);

    case "PUT":
    // return updateProduct(req, res);

    default:
      res.status(405).json({message: "Method Not Allowed"});
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({title: "asc"}).lean();

  await db.disconnect();

  // TODO actualizar las imagenes

  res.status(200).json(products);
};
