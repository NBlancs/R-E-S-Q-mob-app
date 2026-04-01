import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";
import { DOMAIN_COLORS } from "../../../constants/designTokens";

export const footerStyles = StyleSheet.create({
  container: {
    backgroundColor: DOMAIN_COLORS.bfp.footerBackground,
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(16),
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: responsiveFontSize(12),
    color: DOMAIN_COLORS.bfp.footerText,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: DOMAIN_COLORS.shared.logoutButtonBackground,
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(4),
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: responsiveFontSize(12),
  },
});
