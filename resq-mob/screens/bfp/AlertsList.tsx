// screens/bfp/AlertsList.tsx
import React from "react";
import { View, ScrollView } from "react-native";
import { commonScreenStyles as styles } from "../../styles/screens/bfp/commonScreenStyles";
import AlertsList from "../../components/bfp/AlertList";
import Layout from "../../components/bfp/Layout";

export default function AlertsListScreen() {
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AlertsList />
      </ScrollView>
    </Layout>
  );
}
