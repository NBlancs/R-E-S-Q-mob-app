import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const footerStyles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(16),
    borderTopWidth: 1,
    borderTopColor: "#dce3e9",
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: responsiveFontSize(10),
    color: "#5b4040",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.65,
  },
  logoutButton: {
    backgroundColor: "#9d0028",
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(4),
  },
  logoutText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: responsiveFontSize(12),
  },
});
