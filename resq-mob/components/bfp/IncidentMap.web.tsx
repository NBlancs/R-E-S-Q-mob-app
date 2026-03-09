import { StyleSheet, Text, View } from "react-native";

export default function IncidentMap() {
  return (
    <View style={styles.webFallback}>
      <Text style={styles.webTitle}>Map preview is available on iOS/Android.</Text>
      <Text style={styles.webBody}>Run `npm run android` or `npm run ios` to view the live incident map.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  webFallback: {
    minHeight: 220,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d0d7de",
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#f5f8fa",
  },
  webTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  webBody: {
    fontSize: 14,
    color: "#4b5563",
  },
});
