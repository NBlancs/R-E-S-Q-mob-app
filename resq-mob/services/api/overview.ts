import type { SystemOverview } from "./types";
import { apiRequest } from "./client";

export const getSystemOverview = async (token: string) => {
  return apiRequest<SystemOverview>("/system/overview/", {
    method: "GET",
    token,
  });
};
