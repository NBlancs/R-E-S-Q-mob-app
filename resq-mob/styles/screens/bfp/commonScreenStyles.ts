import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const commonScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveSize(8),
  },
  text: {
    fontSize: responsiveFontSize(16),
    color: "#333",
  },
});
