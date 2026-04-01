import React from "react";
import { Text, View } from "react-native";
import {
  ADMIN_INCIDENT_REPORTS,
  type IncidentReportItem,
} from "../../constants/adminReports";
import { incidentsTableStyles as styles } from "../../styles/components/admin/incidentsTable";

interface IncidentsTableProps {
  incidents?: IncidentReportItem[];
}

const severityColorMap: Record<IncidentReportItem["severity"], string> = {
  High: "#dc2626",
  Medium: "#d97706",
  Low: "#15803d",
};

const statusColorMap: Record<IncidentReportItem["status"], string> = {
  Open: "#dc2626",
  Investigating: "#b45309",
  Resolved: "#166534",
};

export default function IncidentsTable({
  incidents = ADMIN_INCIDENT_REPORTS,
}: IncidentsTableProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Incident Reports</Text>
      {incidents.map((incident) => (
        <View style={styles.row} key={incident.id}>
          <View style={styles.rowHeader}>
            <Text style={styles.incidentId}>{incident.id}</Text>
            <Text style={[styles.chip, { color: severityColorMap[incident.severity] }]}> 
              {incident.severity}
            </Text>
          </View>

          <Text style={styles.location}>{incident.location}</Text>

          <View style={styles.rowFooter}>
            <Text style={styles.metaText}>{incident.reportedAt}</Text>
            <Text style={styles.metaText}>{incident.assignedUnit}</Text>
            <Text style={[styles.chip, { color: statusColorMap[incident.status] }]}>
              {incident.status}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}