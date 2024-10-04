"use server";

import { cookies } from "next/headers";

export async function getAccessToken() {
  return cookies().get("accessToken")?.value;
}

export async function getRefreshToken() {
  return cookies().get("refreshToken")?.value;
}
