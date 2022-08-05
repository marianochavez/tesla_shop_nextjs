import type {NextApiRequest, NextApiResponse} from "next";

import {isValidObjectId} from "mongoose";
import {v2 as cloudinary} from "cloudinary";

import {db} from "../../../database";
import {IProduct} from "../../../interfaces";
import {Product} from "../../../models";

type Data =
  | {
      message: string;
    }
  | IProduct
  | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    case "POST":
      return createProduct(req, res);

    case "PUT":
      return updateProduct(req, res);

    default:
      res.status(405).json({message: "Method Not Allowed"});
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({title: "asc"}).lean();

  await db.disconnect();

  const updatedProducts = products.map((product) => {
    // Display image correctly from cloudinary or local
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.HOST_NAME}/products/${image}`;
    });

    return product;
  });

  res.status(200).json(updatedProducts);
};

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {images = []} = req.body as IProduct;

  if (images.length < 2) {
    return res.status(400).json({message: "Images must be at least 2"});
  }

  try {
    await db.connect();
    const productDb = await Product.findOne({slug: req.body.slug}).lean();

    if (productDb) {
      return res.status(400).json({message: "Product already exists"});
    }
    const product = new Product(req.body);

    await product.save();
    await db.disconnect();

    return res.status(201).json(product);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    await db.disconnect();

    return res.status(400).json({message: "Check logs"});
  }
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {_id = "", images = []} = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({message: "Invalid product id"});
  }

  if (images.length < 2) {
    return res.status(400).json({message: "Images must be at least 2"});
  }

  try {
    await db.connect();
    const product = await Product.findById(_id).lean();

    if (!product) {
      await db.disconnect();

      return res.status(400).json({message: "Product not found"});
    }

    // Delete images from cloudinary
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const fileId = image.substring(image.lastIndexOf("/") + 1).split(".")[0];

        // add tesla-shop to public_id to get the folder
        await cloudinary.uploader.destroy(`tesla-shop/${fileId}`);
      }
    });

    await Product.findByIdAndUpdate(_id, {$set: req.body}).lean();
    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    await db.disconnect();

    return res.status(500).json({message: "Internal Server Error"});
  }
};
