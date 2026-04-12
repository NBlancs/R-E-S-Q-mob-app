import type { CameraDto, CameraPayload } from "./types";
import { apiRequest } from "./client";

export const listCameras = async (token: string) => {
  return apiRequest<CameraDto[]>("/cameras/", {
    method: "GET",
    token,
  });
};

export const createCamera = async (token: string, payload: CameraPayload) => {
  return apiRequest<CameraDto>("/cameras/", {
    method: "POST",
    token,
    body: payload,
  });
};

export const updateCamera = async (token: string, id: number, payload: CameraPayload) => {
  return apiRequest<CameraDto>(`/cameras/${id}/`, {
    method: "PUT",
    token,
    body: payload,
  });
};

export const deleteCamera = async (token: string, id: number) => {
  return apiRequest<void>(`/cameras/${id}/`, {
    method: "DELETE",
    token,
  });
};
