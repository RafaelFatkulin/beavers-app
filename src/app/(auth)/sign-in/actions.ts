import { ErrorResponse, SuccessResponse } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function signIn(prevState: any, formData: FormData) {
  const url = new URL("/auth/signin", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password")
      })
    });
    const responseData: SuccessResponse<{
      accessToken: string;
      refreshToken: string;
    }> = await response.json();
    console.log(responseData);

    // return responseData;
    return {
      ...prevState,
      ...responseData
    };
  } catch (error: ErrorResponse | unknown) {
    console.log(error);
  }
}
