"use server";
import { ErrorResponse, SuccessResponse } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function signIn(prevState: any, formData: FormData) {
  const url = new URL("/auth/signin", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const responseData: SuccessResponse<{
      accessToken: string;
      refreshToken: string;
    }> = await response.json();

    cookies().set("accessToken", responseData.data.accessToken);
    cookies().set("refreshToken", responseData.data.refreshToken);

    return {
      ...prevState,
      ...responseData,
    };
  } catch (error: ErrorResponse | unknown) {
    console.log("@@error", error);
  }
}
