import {faker} from "@faker-js/faker";
import bcrypt from "bcryptjs";

import {SeedUser} from "../seed-data";

export const usersFaker = () => {
  const users: SeedUser[] = [
    {
      //! admin user
      name: "Mariano Chavez",
      email: "mariano@gmail.com",
      password: bcrypt.hashSync("123456"),
      role: "admin",
    },
  ];

  for (let i = 0; i < 20; i++) {
    users.push({
      name: faker.name.findName("", "Faker"),
      email: faker.internet.email(),
      password: bcrypt.hashSync("123456"),
      role: "client",
    });
  }

  return users;
};
