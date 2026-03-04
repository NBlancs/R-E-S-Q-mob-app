import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const summaryCardsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: responsiveSize(16),
    paddingHorizontal: responsiveSize(8),
  },
  card: {
    width: "47%",
    padding: responsiveSize(16),
    backgroundColor: "#ddd",
    borderRadius: responsiveSize(8),
    alignItems: "center",
    marginBottom: responsiveSize(12),
  },
  title: {
    fontSize: responsiveFontSize(14),
    fontWeight: "bold",
  },
  value: {
    fontSize: responsiveFontSize(24),
    fontWeight: "bold",
    marginTop: responsiveSize(8),
  },
});
