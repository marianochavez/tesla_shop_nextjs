import bcrypt from "bcryptjs";

import {User} from "../models";

import {db} from ".";

export const getUserProfile = async (id: string = "") => {
  await db.connect();
  const user = await User.findById(id).select("name email -_id").lean();

  await db.disconnect();
  if (!user) return null;

  return user;
};

export const checkUserById = async (id: string = "") => {
  await db.connect();
  const user = await User.findById(id).lean();

  await db.disconnect();

  if (!user) return false;

  return true;
};

export const checkUserEmailPassword = async (email: string = "", password: string = "") => {
  await db.connect();
  const user = await User.findOne({email}).lean();

  await db.disconnect();

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password!)) return null;

  const {role, name, _id} = user;

  return {
    _id,
    email: email.toLowerCase(),
    name,
    role,
  };
};

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await User.findOne({email: oAuthEmail}).lean();

  if (user) {
    await db.disconnect();
    const {_id, name, email, role} = user;

    return {_id, name, email, role};
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    password: "@",
    role: "client",
  });

  await newUser.save();
  await db.disconnect();
  const {_id, name, email, role} = newUser;

  return {_id, name, email, role};
};
