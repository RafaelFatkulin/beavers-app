import { getAccessToken, getRefreshToken } from "@/app/(auth)/_services";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();
  const modifiedConfig = { ...config };

  if (accessToken) {
    modifiedConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return modifiedConfig;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("gg");

      const isSSR = typeof window === "undefined";
      console.log("@@ssr?", isSSR, typeof window);

      if (isSSR) {
        const refreshToken = await getRefreshToken();
        console.log({ refreshToken });

        if (refreshToken) {
          const response = await api.post("/auth/refresh", { refreshToken });
          console.log(response);

          const { accessToken, refreshToken: newRefreshToken } = response.data;

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
        }

        cookies().delete("accessToken");
        cookies().delete("refreshToken");
      }
    }

    return Promise.reject(error);
  }
);
