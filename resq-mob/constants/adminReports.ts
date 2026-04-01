export interface TrendPoint {
  label: string;
  temperature: number;
  smokeDensity: number;
}

export interface SensorBreakdownItem {
  label: "Online" | "Offline" | "Low Battery" | "Faulty";
  value: number;
  color: string;
}

export interface ResponseStatusItem {
  label: "Deployed" | "On Standby" | "En Route";
  count: number;
  detail: string;
  color: string;
}

export interface IncidentReportItem {
  id: string;
  type: "Fire" | "Gas";
  location: string;
  method: "Heat Sensor" | "Camera AI" | "Gas Sensor";
  time: string;
  date: string;
  status: "resolved" | "investigating" | "open";
}

export interface AlertItem {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  timestamp: string;
}

export interface ServiceHealthItem {
  key: string;
  serviceName: string;
  status: "Operational" | "Degraded" | "Offline" | "High Load";
}

export const ADMIN_OVERVIEW_TREND_POINTS: TrendPoint[] = [
  { label: "1h", temperature: 31, smokeDensity: 42 },
  { label: "4h", temperature: 32, smokeDensity: 47 },
  { label: "8h", temperature: 33, smokeDensity: 52 },
  { label: "12h", temperature: 34, smokeDensity: 48 },
  { label: "18h", temperature: 32, smokeDensity: 44 },
  { label: "24h", temperature: 31, smokeDensity: 39 },
];

export const ADMIN_SENSOR_BREAKDOWN: SensorBreakdownItem[] = [
  { label: "Online", value: 96, color: "#31c26a" },
  { label: "Offline", value: 10, color: "#e74c3c" },
  { label: "Low Battery", value: 12, color: "#f39c12" },
  { label: "Faulty", value: 6, color: "#8e44ad" },
];

export const ADMIN_RESPONSE_STATUS: ResponseStatusItem[] = [
  {
    label: "Deployed",
    count: 3,
    detail: "Zone A, Zone C, Zone D",
    color: "#e67e22",
  },
  {
    label: "On Standby",
    count: 2,
    detail: "Central Station",
    color: "#3498db",
  },
  {
    label: "En Route",
    count: 3,
    detail: "Heading to Zone B",
    color: "#8e44ad",
  },
];

export const ADMIN_INCIDENT_REPORTS: IncidentReportItem[] = [
  {
    id: "#INC-001",
    type: "Fire",
    location: "Zone A - North",
    method: "Heat Sensor",
    time: "09:15 AM",
    date: "2026-02-20",
    status: "resolved",
  },
  {
    id: "#INC-002",
    type: "Gas",
    location: "Zone C - Lobby",
    method: "Camera AI",
    time: "08:30 AM",
    date: "2026-02-24",
    status: "investigating",
  },
];

export const ADMIN_ALERTS: AlertItem[] = [
  {
    id: "ALRT-001",
    title: "Smoke detected near Port Area",
    priority: "High",
    timestamp: "5 mins ago",
  },
  {
    id: "ALRT-002",
    title: "Hydrant pressure below threshold",
    priority: "Medium",
    timestamp: "17 mins ago",
  },
  {
    id: "ALRT-003",
    title: "Daily system backup completed",
    priority: "Low",
    timestamp: "41 mins ago",
  },
];

export const ADMIN_SERVICE_HEALTH: ServiceHealthItem[] = [
  { key: "iot-network", serviceName: "IoT Network", status: "Operational" },
  { key: "ml-analytics", serviceName: "ML Analytics", status: "Operational" },
  { key: "database", serviceName: "Database", status: "High Load" },
];
