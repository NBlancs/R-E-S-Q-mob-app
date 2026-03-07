import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const footerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#0d3d52",
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(16),
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: responsiveFontSize(12),
    color: "#aaa",
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(4),
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: responsiveFontSize(12),
  },
});
