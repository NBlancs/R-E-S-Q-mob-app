export interface DashboardMetric {
  key: string;
  label: string;
  value: string | number;
}

export interface IncidentReportItem {
  id: string;
  location: string;
  severity: "Low" | "Medium" | "High";
  reportedAt: string;
  assignedUnit: string;
  status: "Open" | "Investigating" | "Resolved";
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
  status: "Operational" | "Degraded" | "Offline";
}

export const ADMIN_DASHBOARD_METRICS: DashboardMetric[] = [
  { key: "active-cameras", label: "Active Cameras", value: 12 },
  { key: "open-incidents", label: "Open Incidents", value: 5 },
  { key: "system-status", label: "System Status", value: "Operational" },
];

export const ADMIN_INCIDENT_REPORTS: IncidentReportItem[] = [
  {
    id: "INC-2026-101",
    location: "Carmen, Cagayan de Oro",
    severity: "High",
    reportedAt: "09:20",
    assignedUnit: "Unit Alpha",
    status: "Open",
  },
  {
    id: "INC-2026-102",
    location: "Nazareth, Cagayan de Oro",
    severity: "Medium",
    reportedAt: "08:45",
    assignedUnit: "Unit Bravo",
    status: "Investigating",
  },
  {
    id: "INC-2026-103",
    location: "Lapasan, Cagayan de Oro",
    severity: "Low",
    reportedAt: "07:58",
    assignedUnit: "Unit Charlie",
    status: "Resolved",
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
  { key: "camera-streaming", serviceName: "Camera Streaming", status: "Operational" },
  { key: "alerts-engine", serviceName: "Alerts Engine", status: "Operational" },
  { key: "incident-sync", serviceName: "Incident Sync", status: "Degraded" },
];
