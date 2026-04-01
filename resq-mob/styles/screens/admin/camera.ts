import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const cameraScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: responsiveSize(16),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: "700",
    marginBottom: responsiveSize(8),
    color: "#1f2937",
  },
});
