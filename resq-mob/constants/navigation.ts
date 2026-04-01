import type { DomainNavItem } from "../components/shared/layout/DomainHeader";

export const SCREEN_NAMES = {
  LOGIN: "Login",
  OVERVIEW: "Overview",
  CAMERA_LIST: "CameraList",
  CAMERA_FEED: "CameraFeed",
  PROFILE: "Profile",
  REPORTS: "Reports",
  INCIDENT_MAP: "IncidentMap",
  ALERTS_LIST: "AlertsList",
  AUTH_STACK: "Auth",
  ADMIN_STACK: "Admin",
  BFP_STACK: "Bfp",
} as const;

export const ADMIN_NAV_ITEMS: DomainNavItem[] = [
  { label: "Overview", route: SCREEN_NAMES.OVERVIEW },
  { label: "Cameras", route: SCREEN_NAMES.CAMERA_LIST },
  { label: "Reports", route: SCREEN_NAMES.REPORTS },
];

export const BFP_NAV_ITEMS: DomainNavItem[] = [
  { label: "Incident Map", route: SCREEN_NAMES.INCIDENT_MAP },
  { label: "Active Alerts", route: SCREEN_NAMES.ALERTS_LIST },
];
