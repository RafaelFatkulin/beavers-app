"use server";
import { NextRequest } from "next/server";

import { SuccessResponse } from "@/types";
import { cookies } from "next/headers";
import { api } from "@/lib/api";

export async function signIn(prevState: any, formData: FormData) {
  const response = await api.post<
    SuccessResponse<{
      accessToken: string;
      refreshToken: string;
    }>
  >("/auth/signin", {
    email: formData.get("email"),
    password: formData.get("password")
  });

  cookies().set("accessToken", response.data.data.accessToken, {
    secure: false,
    httpOnly: true,
    path: "/"
  });
  cookies().set("refreshToken", response.data.data.refreshToken, {
    secure: false,
    httpOnly: true,
    path: "/"
  });

  return {
    ...prevState,
    ...response.data
  };
}

export async function refreshToken(request: NextRequest) {}
