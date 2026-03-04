import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AlertsList() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Alerts List (Mock)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f9c2c2", borderRadius: 8, marginBottom: 8 },
  text: { fontSize: 16 }
});