export interface CameraUnit {
  id: string;
  name: string;
  location: string;
  status: "Online" | "Offline" | "Maintenance";
  streamQuality: "HD" | "SD";
}

export interface CameraFeedEvent {
  id: string;
  cameraName: string;
  eventLabel: string;
  timestamp: string;
  severity: "Low" | "Medium" | "High";
}

export const ADMIN_CAMERA_UNITS: CameraUnit[] = [
  {
    id: "CAM-001",
    name: "Downtown Intersection",
    location: "Velez St, Cagayan de Oro",
    status: "Online",
    streamQuality: "HD",
  },
  {
    id: "CAM-002",
    name: "Port Access Road",
    location: "Port Area, Cagayan de Oro",
    status: "Maintenance",
    streamQuality: "SD",
  },
  {
    id: "CAM-003",
    name: "West Fire Lane",
    location: "Carmen District, Cagayan de Oro",
    status: "Offline",
    streamQuality: "HD",
  },
];

export const ADMIN_CAMERA_FEED_EVENTS: CameraFeedEvent[] = [
  {
    id: "EVT-2001",
    cameraName: "Downtown Intersection",
    eventLabel: "Smoke signature detected",
    timestamp: "10:12",
    severity: "High",
  },
  {
    id: "EVT-2002",
    cameraName: "Port Access Road",
    eventLabel: "Motion anomaly near hydrant",
    timestamp: "09:41",
    severity: "Medium",
  },
  {
    id: "EVT-2003",
    cameraName: "West Fire Lane",
    eventLabel: "Routine patrol frame captured",
    timestamp: "09:05",
    severity: "Low",
  },
];
