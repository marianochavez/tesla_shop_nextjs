import {faker} from "@faker-js/faker";

import {db} from "..";
import {IOrder, IProduct, IShippingAddress, IUser} from "../../interfaces";
import {Product, User} from "../../models";

export const ordersFaker = async () => {
  await db.connect();

  const userAdmin: IUser = await User.findOne({email: "mariano@gmail.com"}).lean();
  const products: IProduct[] = await Product.find().limit(4).lean();

  await db.disconnect();

  const shippingAddress: IShippingAddress = {
    name: userAdmin.name,
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(),
    address2: "",
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    country: faker.address.country(),
    phone: faker.phone.number(),
  };
  const subTotal = products.reduce((acc, product) => acc + product.price * 3, 0);
  const tax = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
  const total = subTotal * (tax + 1);

  const orders: IOrder[] = [];

  for (let i = 0; i < 20; i++) {
    orders.push({
      user: userAdmin._id,
      orderItems: products.map((product: any) => ({
        _id: product._id,
        title: product.title,
        size: "M",
        quantity: 3,
        slug: product.slug,
        image: product.images[0],
        price: product.price,
        gender: product.gender,
      })),
      shippingAddress,
      numberOfItems: 12,
      subTotal,
      tax: subTotal * tax,
      total: Math.round(total * 100) / 100,
      isPaid: Math.floor(Math.random() * 2) === 0 ? true : false,
    });
  }

  return orders;
};
