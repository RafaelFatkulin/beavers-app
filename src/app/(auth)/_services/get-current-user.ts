import type { ErrorResponse, SuccessResponse } from "@/types";
import { User } from "@/types/user";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

export async function getCurrentUser() {
  try {
    const response = await api.get<SuccessResponse<User>>("/auth/me");

    return response.data;
  } catch (error) {
    const err = error;
    console.log("@@@error", err?.response?.data);
  }
}
