// screens/admin/Reports.tsx
import React from "react";
import { ScrollView, Text, View } from "react-native";
import IncidentsTable from "../../components/admin/IncidentsTable";
import Layout from "../../components/admin/Layout";
import { reportsScreenStyles as styles } from "../../styles/screens/admin/reports";

export default function Reports() {
  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report Incidents</Text>
          <IncidentsTable />
        </View>
      </ScrollView>
    </Layout>
  );
}