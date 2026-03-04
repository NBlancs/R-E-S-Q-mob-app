import React from "react";
import { View, Text } from "react-native";
import { systemStatusStyles as styles } from "../../styles/components/admin/systemStatus";

export default function SystemStatus() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>System Status (Mock)</Text>
    </View>
  );
}