import type {NextApiRequest, NextApiResponse} from "next";

import {db} from "../../../database";
import {IOrder} from "../../../interfaces";
import {Order} from "../../../models";

import {adminMiddleware} from "./middleware";

type Data =
  | {
      message: string;
    }
  | IOrder[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  adminMiddleware(req, res);

  switch (req.method) {
    case "GET":
      return getOrders(req, res);

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const orders = await Order.find().sort({createdAt: "desc"}).populate("user", "name email").lean();

  await db.disconnect();

  res.status(200).json(orders);
};
