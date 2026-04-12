import type { CameraDetectionNotification } from "../../constants/adminCameras";
import { listIncidents } from "./incidents";

const formatTimestamp = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value.replace("T", " ").slice(0, 16);
  }

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  const hours = String(parsed.getHours()).padStart(2, "0");
  const minutes = String(parsed.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const listDetectionAlerts = async (token: string): Promise<CameraDetectionNotification[]> => {
  const incidents = await listIncidents(token);

  return incidents
    .filter(
      (incident) =>
        (incident.incident_type === "fire" || incident.incident_type === "gas") &&
        (incident.status === "open" || incident.status === "investigating"),
    )
    .map((incident) => {
      const detection = incident.incident_type as "fire" | "gas";
      const cameraName = incident.camera_code || "Unassigned Camera";
      return {
        id: `NTF-INC-${incident.id}`,
        cameraId: incident.camera_code || "UNASSIGNED",
        cameraName,
        detection,
        timestamp: formatTimestamp(incident.time_reported),
        message: `${detection.toUpperCase()} detected at ${incident.location}`,
      };
    });
};
