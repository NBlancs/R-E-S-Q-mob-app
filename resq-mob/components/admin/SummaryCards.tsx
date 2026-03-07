import React from "react";
import { View, Text, ScrollView } from "react-native";
import { summaryCardsStyles as styles } from "../../styles/components/admin/summaryCards";

export default function SummaryCards() {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.title}>Active Cameras</Text>
        <Text style={styles.value}>12</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Open Incidents</Text>
        <Text style={styles.value}>5</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>System Status</Text>
        <Text style={styles.value}>OK</Text>
      </View>
    </ScrollView>
  );
}