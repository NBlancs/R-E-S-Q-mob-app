import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function IncidentMap() {
  return (
    <View style={styles.container}>
      <Text>Incident Map (Mock)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#ddd", borderRadius: 8 }
});