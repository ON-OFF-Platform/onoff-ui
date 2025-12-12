export interface User {
  userName: string;
  userEmail: string;
  userLevel: string;
  activeYn: string;
  userBirth?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}