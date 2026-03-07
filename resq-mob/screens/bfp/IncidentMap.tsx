// screens/bfp/IncidentMap.tsx
import React from "react";
import { View, Text } from "react-native";
import { commonScreenStyles as styles } from "../../styles/screens/bfp/commonScreenStyles";
import Layout from "../../components/bfp/Layout";

export default function IncidentMap() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.text}>Incident Map (BFP Mock Screen)</Text>
      </View>
    </Layout>
  );
}