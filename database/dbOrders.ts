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

  // Display image correctly from cloudinary or local
  order.orderItems.map((item) => {
    item.image = item.image.includes("http")
      ? item.image
      : `${process.env.HOST_NAME}/products/${item.image}`;

    return item;
  });

  return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUser = async (userId: string): Promise<IOrder[]> => {
  if (!isValidObjectId(userId)) return [];

  await db.connect();

  const orders = await Order.find({user: userId}).lean();

  await db.disconnect();

  return JSON.parse(JSON.stringify(orders));
};

export const getOrdersStatsByUser = async (userId: string) => {
  if (!isValidObjectId(userId)) return {};

  await db.connect();

  const orders = await Order.find({user: userId}).lean();

  await db.disconnect();

  const stats = {
    totalProductsPurchased: 0,
    totalPaid: 0,
    paidOrders: 0,
    unpaidOrders: 0,
  };

  orders.map((order) => {
    if (order.isPaid) {
      stats.paidOrders++;
      stats.totalPaid += order.total;
      stats.totalProductsPurchased += order.numberOfItems;
    } else {
      stats.unpaidOrders++;
    }

    return order;
  }).length;

  return stats;
};
