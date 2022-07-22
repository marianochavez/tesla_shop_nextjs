import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  if (!session) {
    const requestedPage = req.nextUrl.pathname;

    return NextResponse.redirect(new URL(`/auth/login?p=${requestedPage}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/address", "/checkout/summary"],
};
