import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  console.log("Middleware");

  // if (!req.cookies.get('pizzeria.token')) {
  //   url.pathname = '/login';
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
