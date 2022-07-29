import type {NextApiRequest, NextApiResponse} from "next";

import {getSession} from "next-auth/react";

import {db} from "../../../database";
import {IOrder} from "../../../interfaces";
import {Order, Product} from "../../../models";

type Data = {message: string} | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);

    default:
      res.status(400).end(`Method Not Allowed`);
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {orderItems, total} = req.body as IOrder;

  // Get the user's session
  const session = (await getSession({req})) as any;

  if (!session) {
    return res.status(401).end(`Unauthorized`);
  }

  const productsIds = orderItems.map((product) => product._id);

  await db.connect();
  const dbProducts = await Product.find({_id: {$in: productsIds}});

  try {
    const subTotal = orderItems.reduce((acc, product) => {
      const currentPrice = dbProducts.find(
        (dbProduct) => dbProduct.id.toString() === product._id.toString(),
      )?.price;

      if (!currentPrice) {
        throw new Error(`Producto no encontrado`);
      }

      return acc + currentPrice * product.quantity;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal * (taxRate + 1);

    if (total !== backendTotal) {
      await db.disconnect();
      throw new Error(`El total no es correcto, recargue la pagina`);
    }

    // Create the order
    const userId = session.user._id;
    const newOrder = new Order({
      ...req.body,
      isPaid: false,
      user: userId,
    });

    // two decimal places
    newOrder.total = Math.round(newOrder.total * 100) / 100;

    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();

    return res.status(400).json({message: error.message || "Error inesperado"});
  }
};
