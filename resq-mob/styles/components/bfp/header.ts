import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#c41c3b",
    paddingTop: responsiveSize(12),
    paddingHorizontal: responsiveSize(8),
  },
  title: {
    fontSize: responsiveFontSize(20),
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: responsiveSize(8),
    marginBottom: responsiveSize(8),
  },
  navScroll: {
    paddingHorizontal: responsiveSize(8),
    marginBottom: responsiveSize(8),
  },
  navButton: {
    backgroundColor: "#8b1538",
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(8),
    borderRadius: responsiveSize(6),
    marginRight: responsiveSize(8),
  },
  navButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: responsiveFontSize(14),
  },
});
