import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../utils/responsive";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: responsiveSize(24),
    paddingVertical: responsiveSize(40),
  },
  logoSection: {
    alignItems: "center",
    marginBottom: responsiveSize(48),
  },
  logo: {
    fontSize: responsiveFontSize(36),
    fontWeight: "800",
    color: "#1a5f7a",
    letterSpacing: 4,
    marginBottom: responsiveSize(8),
  },
  logoSubtitle: {
    fontSize: responsiveFontSize(12),
    color: "#666",
    textAlign: "center",
    lineHeight: responsiveFontSize(16),
  },
  welcomeSection: {
    marginBottom: responsiveSize(32),
  },
  welcomeTitle: {
    fontSize: responsiveFontSize(28),
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: responsiveSize(8),
  },
  welcomeSubtitle: {
    fontSize: responsiveFontSize(15),
    color: "#666",
    lineHeight: responsiveFontSize(20),
  },
  formSection: {
    marginBottom: responsiveSize(32),
  },
  inputGroup: {
    marginBottom: responsiveSize(20),
  },
  label: {
    fontSize: responsiveFontSize(14),
    fontWeight: "600",
    color: "#333",
    marginBottom: responsiveSize(8),
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: responsiveSize(8),
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(14),
    fontSize: responsiveFontSize(15),
    color: "#333",
  },
  signInButton: {
    backgroundColor: "#1a5f7a",
    borderRadius: responsiveSize(8),
    paddingVertical: responsiveSize(14),
    alignItems: "center",
    marginTop: responsiveSize(8),
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(16),
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  demoSection: {
    backgroundColor: "#e8f4f8",
    borderLeftWidth: 4,
    borderLeftColor: "#1a5f7a",
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(12),
    borderRadius: responsiveSize(6),
  },
  demoTitle: {
    fontSize: responsiveFontSize(13),
    fontWeight: "600",
    color: "#1a5f7a",
    marginBottom: responsiveSize(6),
  },
  demoText: {
    fontSize: responsiveFontSize(12),
    color: "#555",
    lineHeight: responsiveFontSize(18),
  },
});
