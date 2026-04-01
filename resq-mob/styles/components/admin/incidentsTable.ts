import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const incidentsTableStyles = StyleSheet.create({
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
    backgroundColor: "#fff",
    borderRadius: responsiveSize(8),
    padding: responsiveSize(10),
    marginBottom: responsiveSize(8),
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveSize(6),
  },
  incidentId: {
    fontSize: responsiveFontSize(13),
    fontWeight: "700",
    color: "#1f2937",
  },
  location: {
    fontSize: responsiveFontSize(14),
    color: "#374151",
    marginBottom: responsiveSize(8),
  },
  rowFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaText: {
    fontSize: responsiveFontSize(12),
    color: "#6b7280",
  },
  chip: {
    fontSize: responsiveFontSize(12),
    fontWeight: "700",
  },
});
