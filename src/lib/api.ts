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
    return Promise.reject(error);
  }
);
