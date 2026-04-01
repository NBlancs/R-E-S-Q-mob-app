import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  ADMIN_DASHBOARD_METRICS,
  type DashboardMetric,
} from "../../constants/adminReports";
import { summaryCardsStyles as styles } from "../../styles/components/admin/summaryCards";

interface SummaryCardsProps {
  metrics?: DashboardMetric[];
}

export default function SummaryCards({
  metrics = ADMIN_DASHBOARD_METRICS,
}: SummaryCardsProps) {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {metrics.map((metric) => (
        <View style={styles.card} key={metric.key}>
          <Text style={styles.title}>{metric.label}</Text>
          <Text style={styles.value}>{metric.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
}