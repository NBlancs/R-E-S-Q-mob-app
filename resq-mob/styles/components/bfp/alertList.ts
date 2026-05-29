import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const alertListStyles = StyleSheet.create({
  container: {
    padding: responsiveSize(16),
    backgroundColor: "#fce4ec",
    borderRadius: responsiveSize(8),
    marginBottom: responsiveSize(8),
    borderLeftWidth: 4,
    borderLeftColor: "#c41c3b",
  },
  title: {
    fontSize: responsiveFontSize(14),
    fontWeight: "600",
    color: "#c41c3b",
    marginBottom: responsiveSize(8),
  },
  alertCard: {
    backgroundColor: "#ffffff",
    borderRadius: responsiveSize(8),
    borderWidth: 1,
    borderColor: "#f1b9c6",
    padding: responsiveSize(10),
    marginBottom: responsiveSize(8),
  },
  alertType: {
    fontSize: responsiveFontSize(11),
    fontWeight: "700",
    color: "#c41c3b",
    marginBottom: responsiveSize(4),
  },
  alertMessage: {
    fontSize: responsiveFontSize(13),
    color: "#303030",
    marginBottom: responsiveSize(4),
    lineHeight: responsiveFontSize(18),
  },
  text: {
    fontSize: responsiveFontSize(13),
    color: "#555",
    lineHeight: responsiveFontSize(18),
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: responsiveSize(12),
  },
  emptyText: {
    fontSize: responsiveFontSize(13),
    color: "#999",
    fontStyle: "italic",
  },
});
