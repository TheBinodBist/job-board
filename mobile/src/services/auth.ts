import { post, setApiAccessToken } from "@/services/api";

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

interface AuthResponse {
  message: string;
  user: AuthUser;
  tokens: AuthTokens;
  error?: string;
}

let accessToken = "";
let refreshToken = "";
let authUser: AuthUser | null = null;
const authUserListeners = new Set<(user: AuthUser | null) => void>();

export function getAccessToken() {
  return accessToken;
}

export function getRefreshToken() {
  return refreshToken;
}

export function getAuthUser() {
  return authUser;
}

export function subscribeToAuthUser(
  listener: (user: AuthUser | null) => void,
) {
  authUserListeners.add(listener);
  return () => {
    authUserListeners.delete(listener);
  };
}

export function setAuthSession(tokens: AuthTokens, user: AuthUser) {
  accessToken = tokens.access;
  refreshToken = tokens.refresh;
  authUser = user;
  setApiAccessToken(tokens.access);
  authUserListeners.forEach((listener) => listener(authUser));
}

export function clearAuthSession() {
  accessToken = "";
  refreshToken = "";
  authUser = null;
  setApiAccessToken("");
  authUserListeners.forEach((listener) => listener(authUser));
}

export async function loginUser(credentials: {
  username: string;
  password: string;
}) {
  const response = await post<AuthResponse>("/user/login/", credentials);

  if (response.error) {
    throw new Error(response.error);
  }

  setAuthSession(response.tokens, response.user);
  return response;
}

export async function registerUser(payload: {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}) {
  const response = await post<AuthResponse>("/user/register/", payload);

  if (response.error) {
    throw new Error(response.error);
  }

  setAuthSession(response.tokens, response.user);
  return response;
}
