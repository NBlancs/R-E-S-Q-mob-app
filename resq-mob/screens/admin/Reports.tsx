// screens/admin/Reports.tsx
import React from "react";
import { ScrollView, Text, View } from "react-native";
import AlertList from "../../components/admin/AlertList";
import IncidentsTable from "../../components/admin/IncidentsTable";
import Layout from "../../components/admin/Layout";
import SystemStatus from "../../components/admin/SystemStatus";
import { reportsScreenStyles as styles } from "../../styles/screens/admin/reports";

export default function Reports() {
  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Incident Reports</Text>
          <IncidentsTable />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Overview</Text>
          <SystemStatus />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alert Activity</Text>
          <AlertList />
        </View>
      </ScrollView>
    </Layout>
  );
}