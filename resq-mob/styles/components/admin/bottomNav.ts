import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const bottomNavStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingVertical: responsiveSize(12),
    paddingBottom: responsiveSize(20),
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: responsiveSize(8),
    flex: 1,
  },
  icon: {
    fontSize: responsiveFontSize(24),
    marginBottom: responsiveSize(4),
  },
  label: {
    fontSize: responsiveFontSize(12),
    color: "#999",
    fontWeight: "500",
  },
  labelActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
