import type {NextApiRequest, NextApiResponse} from "next";

import {db, seedDatabase} from "../../database";
import {Order, Product, User} from "../../models";

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({message: "No estás autorizado"});
  }

  await db.connect();
  const {users, products} = seedDatabase.initialData;

  await User.deleteMany();
  await User.insertMany(users);

  await Product.deleteMany();
  await Product.insertMany(products);

  const orders = await seedDatabase.generateOrders();

  await Order.deleteMany();
  await Order.insertMany(orders);

  await db.disconnect();

  res.status(200).json({message: "El seed fue exitoso"});
}
