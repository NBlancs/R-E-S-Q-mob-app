import type { IncidentDto, IncidentPayload } from "./types";
import { apiRequest } from "./client";

export const listIncidents = async (token: string) => {
  return apiRequest<IncidentDto[]>("/incidents/", {
    method: "GET",
    token,
  });
};

export const createIncident = async (token: string, payload: IncidentPayload) => {
  return apiRequest<IncidentDto>("/incidents/", {
    method: "POST",
    token,
    body: payload,
  });
};

export const updateIncident = async (token: string, id: number, payload: IncidentPayload) => {
  return apiRequest<IncidentDto>(`/incidents/${id}/`, {
    method: "PUT",
    token,
    body: payload,
  });
};

export const deleteIncident = async (token: string, id: number) => {
  return apiRequest<void>(`/incidents/${id}/`, {
    method: "DELETE",
    token,
  });
};
