import type {NextApiRequest, NextApiResponse} from "next";

import {getToken} from "next-auth/jwt";

type Data = {message: string};

export const adminMiddleware = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
  const validRoles = ["admin", "client", "superuser", "SEO"];

  if (!session) {
    return res.status(401).json({message: "Unauthorized"});
  }

  if (!validRoles.includes(session.user.role)) {
    return res.status(403).json({message: "Forbidden"});
  }
};
