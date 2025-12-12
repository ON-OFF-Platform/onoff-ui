import { type User } from "@/@types/user";
import { loginApi } from "./api";

/**
 * Auth
 */

/**
 * Login
 * @param userId 
 * @param password 
 * @returns user
 */
export const handleLogin = async (userId: string, password: string): Promise<User> => {
  if (!userId.trim()) throw new Error('아이디를 입력하세요.');
  if (!password.trim()) throw new Error('비밀번호를 입력하세요.');

  const data = await loginApi(userId, password);
  localStorage.setItem('_on_token', data.token);

  return data.user
}