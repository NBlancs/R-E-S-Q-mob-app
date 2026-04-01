import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const operationsProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingBottom: responsiveSize(20),
  },

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
  imageActionButton: {
    borderWidth: 1,
    borderColor: "#93c5fd",
    backgroundColor: "#eff6ff",
    borderRadius: 999,
    paddingHorizontal: responsiveSize(14),
    paddingVertical: responsiveSize(8),
    marginBottom: responsiveSize(10),
  },
  imageActionButtonText: {
    color: "#1d4ed8",
    fontSize: responsiveFontSize(12),
    fontWeight: "700",
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
  formField: {
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(12),
    gap: responsiveSize(8),
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(10),
    fontSize: responsiveFontSize(13),
    color: "#1f2937",
    backgroundColor: "#ffffff",
  },
  saveButton: {
    marginTop: responsiveSize(12),
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: responsiveSize(12),
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: responsiveFontSize(14),
    fontWeight: "700",
  },

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

  bottomPadding: {
    height: responsiveSize(20),
  },
});
