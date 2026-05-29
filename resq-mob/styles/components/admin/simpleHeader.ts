import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const simpleHeaderStyles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    paddingTop: responsiveSize(24),
    paddingHorizontal: responsiveSize(16),
    paddingBottom: responsiveSize(12),
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
  title: {
    fontSize: responsiveFontSize(22),
    fontWeight: "700",
    color: "white",
  },
});
