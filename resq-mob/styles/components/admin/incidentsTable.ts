import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const incidentsTableStyles = StyleSheet.create({
  container: {
    padding: responsiveSize(14),
    backgroundColor: "#f3f4f6",
    borderRadius: responsiveSize(10),
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  heading: {
    fontSize: responsiveFontSize(22),
    fontWeight: "700",
    marginBottom: responsiveSize(14),
    color: "#374151",
  },
  filtersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: responsiveSize(8),
    alignItems: "center",
    marginBottom: responsiveSize(14),
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
    borderRadius: responsiveSize(8),
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(8),
    fontSize: responsiveFontSize(14),
    color: "#1f2937",
    minWidth: responsiveSize(138),
  },
  searchInput: {
    minWidth: responsiveSize(220),
    flexGrow: 1,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: responsiveSize(8),
    backgroundColor: "#ffffff",
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(9),
  },
  filterButtonText: {
    fontSize: responsiveFontSize(13),
    color: "#374151",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    borderRadius: responsiveSize(8),
    paddingHorizontal: responsiveSize(14),
    paddingVertical: responsiveSize(9),
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: responsiveFontSize(13),
  },
  secondaryButton: {
    backgroundColor: "#e5e7eb",
    borderRadius: responsiveSize(8),
    paddingHorizontal: responsiveSize(14),
    paddingVertical: responsiveSize(9),
  },
  secondaryButtonText: {
    color: "#1f2937",
    fontWeight: "700",
    fontSize: responsiveFontSize(13),
  },
  table: {
    minWidth: responsiveSize(1130),
  },
  mobileList: {
    gap: responsiveSize(10),
  },
  mobileCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: responsiveSize(9),
    padding: responsiveSize(10),
    gap: responsiveSize(4),
  },
  mobileCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveSize(4),
  },
  mobileTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: "700",
    color: "#111827",
    flexShrink: 1,
    marginRight: responsiveSize(8),
  },
  mobileMeta: {
    fontSize: responsiveFontSize(13),
    color: "#374151",
  },
  tableHeader: {
    backgroundColor: "#e5e7eb",
    borderRadius: responsiveSize(6),
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    minHeight: responsiveSize(50),
    paddingVertical: responsiveSize(6),
  },
  cell: {
    fontSize: responsiveFontSize(13),
    color: "#1f2937",
    paddingHorizontal: responsiveSize(10),
  },
  headerCell: {
    fontWeight: "700",
    color: "#374151",
  },
  cellId: {
    width: responsiveSize(120),
  },
  cellType: {
    width: responsiveSize(80),
  },
  cellLocation: {
    width: responsiveSize(190),
  },
  cellMethod: {
    width: responsiveSize(150),
  },
  cellTime: {
    width: responsiveSize(120),
  },
  cellDate: {
    width: responsiveSize(140),
  },
  cellStatus: {
    width: responsiveSize(160),
  },
  cellActions: {
    width: responsiveSize(180),
  },
  statusBadge: {
    color: "#111827",
    fontWeight: "700",
    textTransform: "lowercase",
    paddingVertical: responsiveSize(3),
    paddingHorizontal: responsiveSize(8),
    borderRadius: responsiveSize(999),
    overflow: "hidden",
    alignSelf: "flex-start",
    fontSize: responsiveFontSize(12),
  },
  actionsCell: {
    flexDirection: "row",
    gap: responsiveSize(8),
  },
  editButton: {
    backgroundColor: "#0ea5e9",
    borderRadius: responsiveSize(7),
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(6),
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    borderRadius: responsiveSize(7),
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(6),
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: responsiveFontSize(12),
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: responsiveSize(14),
  },
  modalCard: {
    width: "100%",
    maxWidth: responsiveSize(520),
    borderRadius: responsiveSize(10),
    backgroundColor: "#ffffff",
    padding: responsiveSize(14),
    gap: responsiveSize(10),
  },
  pickerCard: {
    width: "100%",
    maxWidth: responsiveSize(420),
    maxHeight: responsiveSize(340),
    borderRadius: responsiveSize(10),
    backgroundColor: "#ffffff",
    padding: responsiveSize(14),
    gap: responsiveSize(10),
  },
  datePickerCard: {
    width: "100%",
    maxWidth: responsiveSize(420),
    borderRadius: responsiveSize(10),
    backgroundColor: "#ffffff",
    padding: responsiveSize(14),
    gap: responsiveSize(10),
  },
  pickerOption: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: responsiveSize(8),
    paddingVertical: responsiveSize(10),
    paddingHorizontal: responsiveSize(10),
    marginBottom: responsiveSize(8),
  },
  pickerOptionText: {
    fontSize: responsiveFontSize(14),
    color: "#1f2937",
    textTransform: "capitalize",
  },
  modalTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: responsiveSize(6),
  },
  inlineSelectRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: responsiveSize(8),
  },
  modalActions: {
    marginTop: responsiveSize(6),
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: responsiveSize(8),
  },
  chip: {
    fontSize: responsiveFontSize(12),
    fontWeight: "700",
  },
});
