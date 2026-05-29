import type { AuthResponse, UserProfile } from "./types";
import { apiRequest } from "./client";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginWithEmail = async (payload: LoginPayload) => {
  return apiRequest<AuthResponse>("/auth/login/", {
    method: "POST",
    body: payload,
  });
};

export const fetchProfile = async (token: string) => {
  return apiRequest<UserProfile>("/auth/profile/", {
    method: "GET",
    token,
  });
};
