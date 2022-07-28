import type {NextApiRequest, NextApiResponse} from "next";

import {db} from "../../../database";
import {Order, Product, User} from "../../../models";

import {adminMiddleware} from "./middleware";

type Data =
  | {message: string}
  | {
      numberOfOrders: number;
      paidOrders: number;
      numberOfClients: number; //role: "client"
      numberOfProducts: number;
      productsWithNoInventory: number;
      lowInventory: number; // number of products with less than 5 in stock
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  adminMiddleware(req, res);

  switch (req.method) {
    case "GET":
      return getData(req, res);

    default:
      res.status(405).json({message: "Method Not Allowed"});
  }
}

const getData = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    Order.countDocuments(),
    Order.find({isPaid: true}).countDocuments(),
    User.countDocuments(),
    Product.countDocuments(),
    Product.find({inStock: 0}).countDocuments(),
    Product.find({inStock: {$lte: 5}}).countDocuments(),
  ]);

  await db.disconnect();
  res.status(200).json({
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  });
};
