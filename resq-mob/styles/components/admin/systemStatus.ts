import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const systemStatusStyles = StyleSheet.create({
  container: {
    padding: responsiveSize(16),
    backgroundColor: "#eee",
    borderRadius: responsiveSize(8),
    marginBottom: responsiveSize(8),
  },
  text: {
    fontSize: responsiveFontSize(14),
  },
});
