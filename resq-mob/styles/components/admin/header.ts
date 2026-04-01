import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";
import { DOMAIN_COLORS } from "../../../constants/designTokens";

export const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: DOMAIN_COLORS.admin.headerBackground,
    paddingTop: responsiveSize(24),
    paddingHorizontal: responsiveSize(8),
    paddingBottom: responsiveSize(8),
  },
  title: {
    fontSize: responsiveFontSize(20),
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: responsiveSize(8),
    marginBottom: responsiveSize(12),
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navScroll: {
    flex: 1,
    paddingHorizontal: responsiveSize(8),
  },
  navButton: {
    backgroundColor: DOMAIN_COLORS.admin.shellAccent,
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
  profileButton: {
    backgroundColor: DOMAIN_COLORS.admin.shellAccent,
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(8),
    borderRadius: responsiveSize(6),
    marginRight: responsiveSize(8),
  },
  profileButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: responsiveFontSize(13),
  },
});
