import { api } from "@/lib/api";
import { SuccessResponse } from "@/types";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("@@api-refresh");

  const body: { refreshToken: string } = await request.json();

  try {
    const response = await api.post<
      SuccessResponse<{ accessToken: string; refreshToken: string }>
    >("/auth/refresh", {
      refreshToken: body.refreshToken
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    cookies().set("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
      path: "/"
    });

    cookies().set("refreshToken", newRefreshToken, {
      secure: false,
      httpOnly: true,
      path: "/"
    });

    const accessTokenCookie = `accessToken=${accessToken}; HttpOnly; Path=/; Secure`;
    const refreshTokenCookie = `refreshToken=${newRefreshToken}; HttpOnly; Path=/; Secure`;
    headers().set("Set-Cookie", `${accessTokenCookie}, ${refreshTokenCookie}`);
    return NextResponse.json({
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500
    });
  }
}
