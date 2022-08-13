import {Product} from "../models";
import {IProduct} from "../interfaces";

import {db} from ".";

interface ProductSlug {
  slug: string;
}

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();

  const products = await Product.find().select("title images price inStock slug -_id").lean();

  await db.disconnect();
  const updatedProducts = products.map((product) => {
    // Display image correctly from cloudinary or local
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.HOST_NAME}/products/${image}`;
    });

    return product;
  });

  return updatedProducts;
};

export const getAllProductsByCategory = async (gender: string): Promise<IProduct[]> => {
  await db.connect();

  const products = await Product.find({gender})
    .select("title images price inStock slug -_id")
    .lean();

  await db.disconnect();
  const updatedProducts = products.map((product) => {
    // Display image correctly from cloudinary or local
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.HOST_NAME}/products/${image}`;
    });

    return product;
  });

  return updatedProducts;
};

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
  await db.connect();

  const product = await Product.findOne({slug}).lean();

  await db.disconnect();

  if (!product) return null;

  // Display image correctly from cloudinary or local
  product.images = product.images.map((image) => {
    return image.includes("http") ? image : `${process.env.HOST_NAME}/products/${image}`;
  });

  return JSON.parse(JSON.stringify(product));
};

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select("slug -_id").lean();

  await db.disconnect;

  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  term = term.toString().toLowerCase();

  await db.connect();

  const products = await Product.find({
    $text: {$search: term},
  })
    .select("title images price slug inStock -_id")
    .lean();

  await db.disconnect();

  const updatedProducts = products.map((product) => {
    // Display image correctly from cloudinary or local
    product.images = product.images.map((image) => {
      return image.includes("http") ? image : `${process.env.HOST_NAME}/products/${image}`;
    });

    return product;
  });

  return updatedProducts;
};
