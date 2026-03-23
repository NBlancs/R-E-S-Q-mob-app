import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingBottom: responsiveSize(20),
  },

  // Profile Header
  profileHeader: {
    alignItems: "center",
    paddingVertical: responsiveSize(24),
    backgroundColor: "#fff",
    marginBottom: responsiveSize(16),
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  profilePictureContainer: {
    marginBottom: responsiveSize(12),
  },
  profilePicture: {
    width: responsiveSize(120),
    height: responsiveSize(120),
    borderRadius: responsiveSize(60),
    borderWidth: 3,
    borderColor: "#0066cc",
  },
  profileName: {
    fontSize: responsiveFontSize(22),
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: responsiveSize(4),
  },
  profileRank: {
    fontSize: responsiveFontSize(14),
    fontWeight: "600",
    color: "#0066cc",
    marginBottom: responsiveSize(4),
  },
  profileStation: {
    fontSize: responsiveFontSize(12),
    color: "#6b7280",
    marginBottom: responsiveSize(8),
    textAlign: "center",
    paddingHorizontal: responsiveSize(12),
  },
  profileId: {
    fontSize: responsiveFontSize(11),
    color: "#9ca3af",
    fontWeight: "500",
  },

  // Sections
  section: {
    marginHorizontal: responsiveSize(12),
    marginBottom: responsiveSize(16),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: responsiveSize(10),
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Info Card
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: responsiveSize(8),
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(12),
  },
  infoLabel: {
    fontSize: responsiveFontSize(13),
    fontWeight: "600",
    color: "#6b7280",
  },
  infoValue: {
    fontSize: responsiveFontSize(13),
    fontWeight: "500",
    color: "#1f2937",
    flex: 1,
    textAlign: "right",
    marginLeft: responsiveSize(12),
  },
  infoValueLink: {
    fontSize: responsiveFontSize(13),
    fontWeight: "500",
    color: "#0066cc",
    flex: 1,
    textAlign: "right",
    marginLeft: responsiveSize(12),
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginHorizontal: responsiveSize(16),
  },

  // Stats Grid
  statsGrid: {
    flexDirection: "row",
    gap: responsiveSize(12),
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: responsiveSize(16),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statValue: {
    fontSize: responsiveFontSize(28),
    fontWeight: "700",
    color: "#0066cc",
    marginBottom: responsiveSize(4),
  },
  statLabel: {
    fontSize: responsiveFontSize(11),
    color: "#6b7280",
    fontWeight: "600",
    textAlign: "center",
  },

  // Certifications
  certContainer: {
    flexDirection: "column",
    gap: responsiveSize(8),
  },
  certBadge: {
    backgroundColor: "#dbeafe",
    borderLeftWidth: 4,
    borderLeftColor: "#0066cc",
    paddingVertical: responsiveSize(10),
    paddingHorizontal: responsiveSize(12),
    borderRadius: 6,
  },
  certText: {
    fontSize: responsiveFontSize(13),
    fontWeight: "600",
    color: "#0066cc",
  },

  // Settings
  settingsCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: responsiveSize(8),
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(12),
  },
  settingLabel: {
    fontSize: responsiveFontSize(13),
    fontWeight: "600",
    color: "#1f2937",
  },

  // Logout Button
  logoutButton: {
    marginHorizontal: responsiveSize(12),
    marginVertical: responsiveSize(12),
    paddingVertical: responsiveSize(14),
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fca5a5",
  },
  logoutButtonText: {
    fontSize: responsiveFontSize(14),
    fontWeight: "700",
    color: "#991b1b",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: responsiveSize(16),
  },
  confirmationModal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(24),
    width: "100%",
    maxWidth: 300,
  },
  confirmationTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: responsiveSize(12),
  },
  confirmationMessage: {
    fontSize: responsiveFontSize(13),
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: responsiveSize(20),
  },
  modalActions: {
    flexDirection: "row",
    gap: responsiveSize(12),
  },
  cancelButton: {
    flex: 1,
    paddingVertical: responsiveSize(10),
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: responsiveFontSize(13),
    fontWeight: "600",
    color: "#4b5563",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: responsiveSize(10),
    backgroundColor: "#991b1b",
    borderRadius: 6,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: responsiveFontSize(13),
    fontWeight: "600",
    color: "#fff",
  },

  // Padding
  bottomPadding: {
    height: responsiveSize(20),
  },
});
