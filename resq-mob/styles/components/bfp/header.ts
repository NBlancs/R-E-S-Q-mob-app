import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";
import { DOMAIN_COLORS } from "../../../constants/designTokens";

export const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: DOMAIN_COLORS.bfp.headerBackground,
    paddingTop: responsiveSize(24),
    paddingHorizontal: responsiveSize(14),
    paddingBottom: responsiveSize(10),
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveSize(10),
    flexShrink: 1,
  },
  title: {
    fontSize: responsiveFontSize(20),
    fontWeight: "700",
    color: "white",
    flexShrink: 1,
  },
  rightControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveSize(8),
  },
  notificationsRoot: {
    position: "relative",
  },
  notificationButton: {
    width: responsiveSize(34),
    height: responsiveSize(34),
    borderRadius: responsiveSize(18),
    borderWidth: 1,
    borderColor: "#fda4af",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: responsiveSize(-4),
    right: responsiveSize(-4),
    minWidth: responsiveSize(16),
    height: responsiveSize(16),
    borderRadius: responsiveSize(999),
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: responsiveSize(3),
  },
  notificationBadgeText: {
    color: "#ffffff",
    fontSize: responsiveFontSize(10),
    fontWeight: "700",
  },
  notificationsModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: responsiveSize(84),
  },
  notificationsModalPanel: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#fbcfe8",
    borderRadius: responsiveSize(12),
    padding: responsiveSize(10),
  },
  notificationsTitle: {
    fontSize: responsiveFontSize(15),
    fontWeight: "700",
    color: "#111827",
    marginBottom: responsiveSize(8),
  },
  notificationsScroll: {},
  notificationItem: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: responsiveSize(8),
    padding: responsiveSize(8),
    marginBottom: responsiveSize(8),
  },
  notificationItemBody: {
    gap: responsiveSize(3),
    marginBottom: responsiveSize(8),
  },
  notificationType: {
    fontSize: responsiveFontSize(11),
    fontWeight: "700",
    color: "#dc2626",
  },
  notificationText: {
    fontSize: responsiveFontSize(13),
    color: "#1f2937",
  },
  notificationMeta: {
    fontSize: responsiveFontSize(12),
    color: "#6b7280",
  },
  ackButton: {
    alignSelf: "flex-end",
    backgroundColor: "#db2777",
    borderRadius: responsiveSize(6),
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(6),
  },
  ackButtonText: {
    color: "#ffffff",
    fontSize: responsiveFontSize(12),
    fontWeight: "700",
  },
});
