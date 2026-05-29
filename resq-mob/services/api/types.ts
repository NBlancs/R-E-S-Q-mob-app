export type UserRole = "admin" | "bfp";

export interface UserProfile {
  username: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: UserProfile;
}

export type CameraStatus = "online" | "offline" | "maintenance";

export interface CameraDto {
  id: number;
  camera_code: string;
  name: string;
  location: string;
  status: CameraStatus;
  last_active: string;
  footage_url: string;
  created_at: string;
  updated_at: string;
}

export interface CameraPayload {
  camera_code: string;
  name: string;
  location: string;
  status: CameraStatus;
  footage_url?: string;
}

export type IncidentType = "fire" | "gas" | "smoke" | "other";
export type DetectionMethod = "heat_sensor" | "camera_ai" | "gas_sensor" | "manual";
export type IncidentStatus = "open" | "investigating" | "resolved";

export interface IncidentDto {
  id: number;
  incident_code: string;
  incident_type: IncidentType;
  location: string;
  detection_method: DetectionMethod;
  time_reported: string;
  status: IncidentStatus;
  camera: number | null;
  camera_code: string;
  reported_by: number | null;
  reported_by_username: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface IncidentPayload {
  incident_code: string;
  incident_type: IncidentType;
  location: string;
  detection_method: DetectionMethod;
  time_reported: string;
  status: IncidentStatus;
  camera?: number | null;
  notes?: string;
}

export interface SystemOverview {
  camera_count: number;
  incident_count: number;
  open_incidents: number;
  resolved_incidents: number;
}
