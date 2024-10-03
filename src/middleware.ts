import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(
    "@@middle",
    request.url,
    new URL(request.url, request.url).href,
    new URL(request.url, request.url).href === new URL("/", request.url).href
  );
  if (
    new URL(request.url, request.url).href === new URL("/", request.url).href
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //   if (false) {
  //     return NextResponse.redirect(new URL("/sign-in", request.url));
  //   }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};
