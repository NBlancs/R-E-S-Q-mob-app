// screens/admin/Overview.tsx
import React from "react";
import { ScrollView } from "react-native";
import SummaryCards from "../../components/admin/SummaryCards";
import SystemStatus from "../../components/admin/SystemStatus";
import Layout from "../../components/admin/Layout";

export default function Overview() {
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SummaryCards />
        <SystemStatus />
      </ScrollView>
    </Layout>
  );
}