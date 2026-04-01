import React from "react";
import { Text, View } from "react-native";
import {
  ADMIN_SERVICE_HEALTH,
  type ServiceHealthItem,
} from "../../constants/adminReports";
import { systemStatusStyles as styles } from "../../styles/components/admin/systemStatus";

interface SystemStatusProps {
  services?: ServiceHealthItem[];
}

const statusColorMap: Record<ServiceHealthItem["status"], string> = {
  Operational: "#15803d",
  Degraded: "#d97706",
  Offline: "#dc2626",
};

export default function SystemStatus({
  services = ADMIN_SERVICE_HEALTH,
}: SystemStatusProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>System Health</Text>
      {services.map((service) => (
        <View style={styles.row} key={service.key}>
          <Text style={styles.serviceName}>{service.serviceName}</Text>
          <Text style={[styles.statusText, { color: statusColorMap[service.status] }]}>
            {service.status}
          </Text>
        </View>
      ))}
    </View>
  );
}