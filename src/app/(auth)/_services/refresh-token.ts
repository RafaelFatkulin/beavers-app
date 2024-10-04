import { ErrorResponse, SuccessResponse } from "@/types";
import { getRefreshToken } from "./get-token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function refreshToken(token: string) {
  const url = new URL("/auth/refresh", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refreshToken: token
      })
    });

    const responseJson: SuccessResponse<{
      accessToken: string;
      refreshToken: string;
    }> = await response.json();

    console.log("@refresh-response", response);

    return responseJson;
  } catch (error) {
    throw error as ErrorResponse;
  }
}
