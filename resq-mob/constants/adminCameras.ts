export type CameraStatus = "online" | "offline" | "maintenance";
export type CameraDetection = "fire" | "gas" | "smoke" | "none";

export interface CameraItem {
  id: string;
  name: string;
  location: string;
  status: CameraStatus;
  lastActive: string;
  onlineDuration: string;
  activeRange: "24h" | "7d" | "30d";
  footageUrl: string;
}

export interface CameraFeedEvent {
  id: string;
  cameraId: string;
  cameraName: string;
  detection: CameraDetection;
  confidence: number;
  timestamp: string;
  footageUrl: string;
}

export interface CameraDetectionNotification {
  id: string;
  cameraId: string;
  cameraName: string;
  detection: "fire" | "gas";
  timestamp: string;
  message: string;
}

export const CAMERA_STATUS_OPTIONS: CameraStatus[] = [
  "online",
  "offline",
  "maintenance",
];

export const ACTIVE_RANGE_OPTIONS: Array<CameraItem["activeRange"]> = [
  "24h",
  "7d",
  "30d",
];

export const ADMIN_CAMERA_UNITS: CameraItem[] = [
  {
    id: "CAM-001",
    name: "Entrance Gate",
    location: "Main Building",
    status: "online",
    lastActive: "2026-02-24 09:12",
    onlineDuration: "874h 16m 15s",
    activeRange: "24h",
    footageUrl:
      "https://images.pexels.com/photos/1118866/pexels-photo-1118866.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "CAM-002",
    name: "Parking Lot A",
    location: "North Wing",
    status: "offline",
    lastActive: "2026-02-24 08:47",
    onlineDuration: "-",
    activeRange: "7d",
    footageUrl:
      "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "CAM-003",
    name: "Lobby Camera",
    location: "Reception",
    status: "online",
    lastActive: "2026-02-24 09:20",
    onlineDuration: "874h 8m 15s",
    activeRange: "30d",
    footageUrl:
      "https://images.pexels.com/photos/266048/pexels-photo-266048.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export const ADMIN_CAMERA_FEED_EVENTS: CameraFeedEvent[] = [
  {
    id: "EVT-3001",
    cameraId: "CAM-001",
    cameraName: "Entrance Gate",
    detection: "smoke",
    confidence: 0.67,
    timestamp: "2026-02-24 09:13",
    footageUrl:
      "https://images.pexels.com/photos/1118866/pexels-photo-1118866.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "EVT-3002",
    cameraId: "CAM-002",
    cameraName: "Parking Lot A",
    detection: "gas",
    confidence: 0.33,
    timestamp: "2026-02-24 09:08",
    footageUrl:
      "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "EVT-3003",
    cameraId: "CAM-003",
    cameraName: "Lobby Camera",
    detection: "fire",
    confidence: 0.43,
    timestamp: "2026-02-24 09:05",
    footageUrl:
      "https://images.pexels.com/photos/266048/pexels-photo-266048.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export const ADMIN_CAMERA_NOTIFICATIONS: CameraDetectionNotification[] =
  ADMIN_CAMERA_FEED_EVENTS.filter(
    (event): event is CameraFeedEvent & { detection: "fire" | "gas" } =>
      event.detection === "fire" || event.detection === "gas",
  ).map((event) => ({
    id: `NTF-${event.id}`,
    cameraId: event.cameraId,
    cameraName: event.cameraName,
    detection: event.detection,
    timestamp: event.timestamp,
    message: `${event.detection.toUpperCase()} detected on ${event.cameraName}`,
  }));
