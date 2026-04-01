import React from "react";
import { View, Text } from "react-native";
import {
  ADMIN_CAMERA_NOTIFICATIONS,
  type CameraDetectionNotification,
} from "../../constants/adminCameras";
import { alertListStyles as styles } from "../../styles/components/bfp/alertList";

interface AlertsListProps {
  alerts?: CameraDetectionNotification[];
}

export default function AlertsList({
  alerts = ADMIN_CAMERA_NOTIFICATIONS,
}: AlertsListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Alerts</Text>
      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <View key={alert.id} style={styles.alertCard}>
            <Text style={styles.alertType}>{alert.detection.toUpperCase()}</Text>
            <Text style={styles.alertMessage}>{alert.message}</Text>
            <Text style={styles.text}>Camera: {alert.cameraName}</Text>
            <Text style={styles.text}>Time: {alert.timestamp}</Text>
          </View>
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No active alerts</Text>
        </View>
      )}
    </View>
  );
}