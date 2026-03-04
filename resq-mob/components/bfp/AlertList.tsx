import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AlertsList() {
  return (
    <View style={styles.container}>
      <Text>Alerts List (BFP Mock)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f9c2c2", borderRadius: 8, marginBottom: 8 }
});