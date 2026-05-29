import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const cameraScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4faff",
  },
  content: {
    gap: responsiveSize(16),
    paddingBottom: responsiveSize(28),
  },
  pageHeader: {
    gap: responsiveSize(6),
  },
  pageTitle: {
    color: "#161d21",
    fontSize: responsiveFontSize(24),
    fontWeight: "700",
    lineHeight: responsiveSize(30),
  },
  pageSubtitle: {
    color: "#5b4040",
    fontSize: responsiveFontSize(15),
    fontWeight: "500",
    lineHeight: responsiveSize(21),
  },
  section: {
    gap: responsiveSize(8),
  },
  sectionTitle: {
    color: "#161d21",
    fontSize: responsiveFontSize(18),
    fontWeight: "700",
  },
});
