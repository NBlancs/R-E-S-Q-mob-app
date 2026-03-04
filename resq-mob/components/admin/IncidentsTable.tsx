import React from "react";
import { View, Text } from "react-native";
import { incidentsTableStyles as styles } from "../../styles/components/admin/incidentsTable";

export default function IncidentsTable() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Incidents Table (Mock)</Text>
    </View>
  );
}