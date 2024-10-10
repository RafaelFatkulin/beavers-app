import { api } from "@/lib/api";
import { SuccessResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: { refreshToken: string } = await request.json();
  console.log("@@api-body", body);

  try {
    const response = await api.post<
      SuccessResponse<{ accessToken: string; refreshToken: string }>
    >("/auth/refresh", {
      refreshToken: body.refreshToken
    });

    console.log("@@api-response", response.data);

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    const res = NextResponse.json({
      message: "Welcome",
      accessToken,
      refreshToken: newRefreshToken
    });

    // Set the cookies using `NextResponse.cookies.set`
    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30
    });

    res.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30
    });

    return res;
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500
    });
  }
}
