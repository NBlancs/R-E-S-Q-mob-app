import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ADMIN_ALERTS, type AlertItem } from "../../constants/adminReports";
import { responsiveFontSize, responsiveSize } from "../../utils/responsive";

interface AlertListProps {
  alerts?: AlertItem[];
}

const priorityColorMap: Record<AlertItem["priority"], string> = {
  High: "#dc2626",
  Medium: "#d97706",
  Low: "#15803d",
};

export default function AlertsList({ alerts = ADMIN_ALERTS }: AlertListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Latest Alerts</Text>
      {alerts.map((alert) => (
        <View style={styles.alertRow} key={alert.id}>
          <View style={styles.alertBody}>
            <Text style={styles.alertTitle}>{alert.title}</Text>
            <Text style={styles.alertMeta}>{alert.timestamp}</Text>
          </View>
          <Text style={[styles.priorityText, { color: priorityColorMap[alert.priority] }]}>
            {alert.priority}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: responsiveSize(12),
    backgroundColor: "#f3f4f6",
    borderRadius: responsiveSize(8),
  },
  heading: {
    fontSize: responsiveFontSize(16),
    fontWeight: "700",
    marginBottom: responsiveSize(10),
    color: "#111827",
  },
  alertRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: responsiveSize(8),
    padding: responsiveSize(10),
    marginBottom: responsiveSize(8),
  },
  alertBody: {
    flex: 1,
    paddingRight: responsiveSize(10),
  },
  alertTitle: {
    fontSize: responsiveFontSize(13),
    fontWeight: "600",
    color: "#1f2937",
  },
  alertMeta: {
    fontSize: responsiveFontSize(12),
    color: "#6b7280",
    marginTop: responsiveSize(4),
  },
  priorityText: {
    fontSize: responsiveFontSize(12),
    fontWeight: "700",
  },
});