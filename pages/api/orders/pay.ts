import type {NextApiRequest, NextApiResponse} from "next";

import axios from "axios";
import {isValidObjectId} from "mongoose";
import {getSession} from "next-auth/react";

import {IPaypal} from "../../../interfaces";
import {db} from "../../../database";
import {Order} from "../../../models";

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);

    default:
      res.status(405).json({message: "Method Not Allowed"});
  }
}

/**
 * It gets the PayPal bearer token by using the client id and secret
 * @returns A string or null.
 */
const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  /* Converting the client id and secret to base64. */
  const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, "utf8").toString("base64");
  // for x-www-form-urlencoded content type
  const body = new URLSearchParams("grant_type=client_credentials");

  try {
    const {data} = await axios.post(process.env.PAYPAL_OAUTH_URL || "", body, {
      headers: {
        Authorization: `Basic ${base64Token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // eslint-disable-next-line no-console
      console.log(error.response?.data);
    } else {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {transactionId = "", orderId = ""} = req.body;

  const session = getSession({req});

  if (!session) {
    return res.status(401).json({message: "Unauthorized"});
  }

  if (!isValidObjectId(orderId)) {
    return res.status(400).json({message: "Invalid order id"});
  }

  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    return res.status(500).json({message: "Failed to get paypal bearer token"});
  }

  const {data} = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL || ""}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    },
  );

  if (data.status !== "COMPLETED") {
    return res.status(401).json({message: "Orden no reconocida"});
  }

  await db.connect();
  const dbOrder = await Order.findById(orderId);

  if (!dbOrder) {
    await db.disconnect();

    return res.status(404).json({message: "Orden no encontrada"});
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();

    return res
      .status(400)
      .json({message: "El total de la orden no coincide con el total de la transacción"});
  }

  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true;
  await dbOrder.save();
  await db.disconnect();

  res.status(200).json({message: "Orden pagada"});
};
