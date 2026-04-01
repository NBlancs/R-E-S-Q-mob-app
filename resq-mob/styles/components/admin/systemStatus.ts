import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const systemStatusStyles = StyleSheet.create({
  container: {
    padding: responsiveSize(12),
    backgroundColor: "#f3f4f6",
    borderRadius: responsiveSize(8),
  },
  heading: {
    fontSize: responsiveFontSize(16),
    fontWeight: "700",
    marginBottom: responsiveSize(10),
    color: "#111827",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: responsiveSize(8),
    padding: responsiveSize(10),
    marginBottom: responsiveSize(8),
  },
  serviceName: {
    fontSize: responsiveFontSize(13),
    fontWeight: "600",
    color: "#1f2937",
  },
  statusText: {
    fontSize: responsiveFontSize(12),
    fontWeight: "700",
  },
});
