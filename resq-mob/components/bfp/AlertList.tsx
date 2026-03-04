import React from "react";
import { View, Text } from "react-native";
import { alertListStyles as styles } from "../../styles/components/bfp/alertList";

export default function AlertsList() {
  const alerts = [
    { id: 1, type: "High Priority", message: "Active incident in District 5" },
    { id: 2, type: "Medium Priority", message: "Backup units requested" },
    { id: 3, type: "Low Priority", message: "Routine patrol area check" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Alerts</Text>
      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <Text key={alert.id} style={styles.text}>
            • {alert.type}: {alert.message}
          </Text>
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No active alerts</Text>
        </View>
      )}
    </View>
  );
}