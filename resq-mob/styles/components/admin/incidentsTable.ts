import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const incidentsTableStyles = StyleSheet.create({
  container: {
    padding: responsiveSize(16),
    backgroundColor: "#ddd",
    borderRadius: responsiveSize(8),
  },
  text: {
    fontSize: responsiveFontSize(14),
  },
});
