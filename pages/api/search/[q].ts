import type {NextApiRequest, NextApiResponse} from "next";

import {db} from "../../../database";
import {IProduct} from "../../../interfaces";
import {Product} from "../../../models";

type Data = {
  message: string;
  products?: IProduct[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return searchProducts(req, res);

    default:
      return res.status(400).json({message: "Method not allowed"});
  }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let {q = ""} = req.query;

  if (q.length === 0) {
    return res.status(400).json({message: "Query is empty"});
  }

  q = q.toString().toLowerCase();

  await db.connect();

  const products = await Product.find({
    $text: {$search: q},
  })
    .select("title images price slug inStock -_id")
    .lean();

  await db.disconnect();

  res.status(200).json({message: "OK", products});
};
