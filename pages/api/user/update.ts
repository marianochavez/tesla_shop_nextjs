import type {NextApiRequest, NextApiResponse} from "next";

import bcrypt from "bcryptjs";

import {db} from "../../../database";
import {User} from "../../../models";
import {jwt, validations} from "../../../utils";

type Data = {message: string} | {token: string; user: {email: string; role: string; name: string}};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "PUT":
      return updateUser(req, res);

    default:
      res.status(405).json({message: "Method Not Allowed"});
  }
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    name = "",
    email = "",
    oldPassword = "",
    newPassword = "",
  } = req.body as {name: string; email: string; oldPassword: string; newPassword: string};

  if (oldPassword.length < 6) {
    return res.status(400).json({message: "La contraseña debe tener al menos 6 caracteres"});
  }

  if (name.length < 2) {
    return res.status(400).json({message: "El nombre debe tener al menos 2 caracteres"});
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({message: "El email no es válido"});
  }

  await db.connect();
  const user = await User.findOne({email});

  if (!user) {
    await db.disconnect();

    return res.status(400).json({message: "Correo no registrado"});
  }

  if (!bcrypt.compareSync(oldPassword, user.password!)) {
    await db.disconnect();

    return res.status(400).json({message: "Contraseña incorrecta"});
  }

  if (name !== user.name) {
    user.name = name;
  }

  if (newPassword.length >= 6 && oldPassword !== newPassword) {
    user.password = bcrypt.hashSync(newPassword, 10);
  }

  try {
    await user.save({validateBeforeSave: true});
    await db.disconnect();
  } catch (error) {
    // eslint-disable-next-line no-console
    await db.disconnect();

    return res.status(400).json({message: "Error al actualizar usuario"});
  }

  const {_id, role} = user;
  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      name,
      email,
      role,
    },
  });
};
