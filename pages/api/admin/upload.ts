import type {NextApiRequest, NextApiResponse} from "next";

import formidable from "formidable";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return uploadFile(req, res);

    default:
      res.status(405).json({message: "Method Not Allowed"});
  }
}

const saveFile = async (file: formidable.File): Promise<string> => {
  try {
    const {secure_url} = await cloudinary.uploader.upload(file.filepath, {
      folder: "tesla-shop",
    });

    return secure_url;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return "";
  }
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return reject(err);
      }

      const filePath = await saveFile(files.files as formidable.File);

      if (filePath.length === 0) return reject(new Error("File Upload Failed"));
      resolve(filePath);
    });
  });
};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const imageUrl = await parseFiles(req);

  res.status(200).json({message: imageUrl});
};
