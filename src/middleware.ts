import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const currentUrl = new URL(request.url, request.url).href;
  const urlToCompare = (path: string) => new URL(path, request.url).href;

  const isUrl = (path: string) => {
    return currentUrl === urlToCompare(path);
  };

  if (isUrl("/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};
