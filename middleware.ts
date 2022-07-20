import {NextRequest, NextResponse, NextFetchEvent} from "next/server";

import {jwt} from "./utils";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // ! hacer con NEXTAUTH
  // const token = req.cookies.get("token") || "";

  // if (token.length < 10) {
  //   return;
  // }

  // try {
  //   const res = await jwt.isValidToken(token);

  //   return NextResponse.next();
  // } catch (error) {
  //   return NextResponse.redirect(new URL(`/auth/login?p=${req.nextUrl.pathname}`, req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/address", "/checkout/summary"],
};
