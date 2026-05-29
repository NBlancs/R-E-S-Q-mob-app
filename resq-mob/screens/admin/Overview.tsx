// screens/admin/Overview.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import SummaryCards from "../../components/admin/SummaryCards";
import SystemStatus from "../../components/admin/SystemStatus";
import Layout from "../../components/admin/Layout";
import { useAuth } from "../../hooks/useAuth";
import { getSystemOverview, type SystemOverview } from "../../services/api";
import { commonScreenStyles as styles } from "../../styles/screens/admin/commonScreenStyles";

export default function Overview() {
  const { token } = useAuth();
  const [overview, setOverview] = useState<SystemOverview | null>(null);
  const [loadingOverview, setLoadingOverview] = useState(false);

  useEffect(() => {
    const loadOverview = async () => {
      if (!token) {
        return;
      }

      setLoadingOverview(true);
      try {
        const response = await getSystemOverview(token);
        setOverview(response);
      } catch {
        // Keep chart cards visible even if overview fetch fails.
      } finally {
        setLoadingOverview(false);
      }
    };

    void loadOverview();
  }, [token]);

  return (
    <Layout>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Command Overview</Text>
          <Text style={styles.pageSubtitle}>
            Live operational visibility across cameras, incidents, sensors, and response teams.
          </Text>
        </View>
        <SummaryCards overview={overview} loadingOverview={loadingOverview} />
        <SystemStatus />
      </ScrollView>
    </Layout>
  );
}
