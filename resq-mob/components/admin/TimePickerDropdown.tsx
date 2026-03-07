import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TimePickerDropdown() {
  return (
    <View style={styles.container}>
      <Text>Time Picker Dropdown (Mock)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#ddd", borderRadius: 8, marginBottom: 8 }
});