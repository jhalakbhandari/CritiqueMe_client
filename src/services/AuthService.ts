import axios from "axios";
import type { Post } from "../pages/UserFeed";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const TOKEN_KEY = "token";
const USER_KEY = "user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  profilepic?: string;
  posts: Post[];
  followers: { id: string }[];
  following: { id: string }[];
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export async function login(data: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(
      `${BACKEND_URL}/api/auth/login`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { token, user } = response.data;

    // Store token and user inside authService itself
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): User | null {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
}
