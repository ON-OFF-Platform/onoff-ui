import type { LoginResponse } from "@/@types/user";
import { ApiClient } from "@/client/api.client";

export const apiClient = new ApiClient();

/**
 * Auth
 */

/**
 * Login
 * @param userId 
 * @param password 
 * @returns { token, user { userName, userEmail, userLevel, avtiveYn, userBirth } }
*/
export const loginApi = async (userId: string, password: string): Promise<LoginResponse> => {
  return apiClient.POST<LoginResponse>('/auth/login', {
    userId,
    password,
  });
};