import type {NextApiRequest, NextApiResponse} from "next";

import {isValidObjectId} from "mongoose";
import {getToken} from "next-auth/jwt";

import {db} from "../../../database";
import {IUser} from "../../../interfaces";
import {User} from "../../../models";

type Data = {message: string} | IUser[];

const middleware = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
  const validRoles = User.schema.path("role").options.enum.values;

  if (!session) {
    return res.status(401).json({message: "Unauthorized"});
  }

  if (!validRoles.includes(session.user.role)) {
    return res.status(403).json({message: "Forbidden"});
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // middleware(req, res);
  // ! use

  switch (req.method) {
    case "GET":
      return getUsers(req, res);

    case "PUT":
      return updateUser(req, res);

    default:
      res.status(405).json({message: "Method Not Allowed"});
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await User.find().select("-password").lean();

  await db.disconnect();

  res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {userId = "", role = ""} = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({message: "Invalid userId"});
  }

  const validRoles = User.schema.path("role").options.enum.values;

  if (!validRoles.includes(role)) {
    return res.status(400).json({message: "Invalid role"});
  }

  await db.connect();
  const user = await User.findById(userId);

  if (!user) {
    await db.disconnect();

    return res.status(404).json({message: "User not found"});
  }

  user.role = role;
  await user.save();
  await db.disconnect();

  res.status(200).json({message: "User updated"});
};
