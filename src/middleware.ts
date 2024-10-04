import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./app/(auth)/_services";

export async function middleware(request: NextRequest) {
  const currentUrl = new URL(request.url, request.url).href;
  const urlToCompare = (path: string) => new URL(path, request.url).href;

  const isUrl = (path: string) => {
    return currentUrl === urlToCompare(path);
  };

  const currentUser = await getCurrentUser();

  console.log("@@currentUser", currentUser);

  if (!currentUser?.success) {
  }

  if (isUrl("/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isUrl("/dashboard") && !currentUser?.success) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if ((isUrl("/sign-in") || isUrl("/sign-up")) && currentUser?.success) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};
