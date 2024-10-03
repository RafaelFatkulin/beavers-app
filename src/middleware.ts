import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(
    "@@middle",
    request.url,
    new URL(request.url, request.url).href,
    new URL(request.url, request.url).href === new URL("/", request.url).href
  );
  console.log("@@cookies", request.cookies.getAll());

  if (
    new URL(request.url, request.url).href === new URL("/", request.url).href
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const cookieStore = cookies();
  const accessCookie = cookieStore.get("accessToken")?.value;

  if (
    new URL(request.url, request.url).href ===
      new URL("/sign-in", request.url).href &&
    accessCookie
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  console.log(accessCookie);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
