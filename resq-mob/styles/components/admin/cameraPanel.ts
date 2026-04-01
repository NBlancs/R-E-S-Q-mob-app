import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const cameraPanelStyles = StyleSheet.create({
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
    marginBottom: responsiveSize(4),
  },
  cameraName: {
    fontSize: responsiveFontSize(13),
    fontWeight: "700",
    color: "#1f2937",
  },
  cameraMeta: {
    fontSize: responsiveFontSize(12),
    color: "#6b7280",
    marginTop: responsiveSize(2),
  },
  chip: {
    fontSize: responsiveFontSize(12),
    fontWeight: "700",
  },
});
