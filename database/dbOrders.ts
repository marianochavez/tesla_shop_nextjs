import {isValidObjectId} from "mongoose";

import {IOrder} from "../interfaces";
import {Order} from "../models";

import {db} from ".";

export const getOrderById = async (id: string, populate?: boolean): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();

  const order = populate ? await Order.findById(id).populate("user") : await Order.findById(id);

  await db.disconnect();

  if (!order) return null;

  return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUser = async (userId: string): Promise<IOrder[]> => {
  if (!isValidObjectId(userId)) return [];

  await db.connect();

  const orders = await Order.find({user: userId}).lean();

  await db.disconnect();

  return JSON.parse(JSON.stringify(orders));
};
