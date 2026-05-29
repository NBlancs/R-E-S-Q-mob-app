import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const summaryCardsStyles = StyleSheet.create({
  container: {
    gap: responsiveSize(16),
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e3bebe",
    borderRadius: responsiveSize(12),
    padding: responsiveSize(18),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: responsiveFontSize(18),
    fontWeight: "700",
    color: "#161d21",
    lineHeight: responsiveSize(24),
  },
  subtitle: {
    marginTop: responsiveSize(6),
    fontSize: responsiveFontSize(14),
    fontWeight: "500",
    color: "#5b4040",
    lineHeight: responsiveSize(20),
  },
  statTiles: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: responsiveSize(10),
    marginTop: responsiveSize(16),
  },
  statTile: {
    minWidth: responsiveSize(120),
    flexGrow: 1,
    backgroundColor: "#eef4fa",
    borderWidth: 1,
    borderColor: "#e3bebe",
    borderRadius: responsiveSize(10),
    padding: responsiveSize(12),
  },
  statTileLabel: {
    color: "#5b4040",
    fontSize: responsiveFontSize(12),
    fontWeight: "700",
  },
  statTileValue: {
    color: "#161d21",
    fontSize: responsiveFontSize(20),
    fontWeight: "800",
    marginTop: responsiveSize(4),
  },
  statTileValueAlert: {
    color: "#9d0028",
  },
  statTileValueResolved: {
    color: "#236580",
  },
  chartKitContainer: {
    marginTop: responsiveSize(12),
    borderRadius: responsiveSize(12),
    paddingRight: 0,
  },
  legendDot: {
    width: responsiveSize(10),
    height: responsiveSize(10),
    borderRadius: responsiveSize(999),
  },
  sensorRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveSize(14),
    gap: responsiveSize(10),
  },
  donutWrap: {
    width: "100%",
    height: responsiveSize(170),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#eef4fa",
    borderRadius: responsiveSize(12),
  },
  sensorLegendList: {
    width: "100%",
    gap: responsiveSize(10),
  },
  sensorLegendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveSize(8),
    backgroundColor: "#eef4fa",
    borderRadius: responsiveSize(8),
    paddingVertical: responsiveSize(10),
    paddingHorizontal: responsiveSize(12),
  },
  sensorLegendLabel: {
    flex: 1,
    fontSize: responsiveFontSize(15),
    color: "#161d21",
    fontWeight: "600",
  },
  sensorLegendValue: {
    fontSize: responsiveFontSize(15),
    fontWeight: "800",
    color: "#161d21",
  },
  responseList: {
    marginTop: responsiveSize(16),
    gap: responsiveSize(12),
  },
  responseItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef4fa",
    borderWidth: 1,
    borderColor: "#e3bebe",
    borderRadius: responsiveSize(10),
    paddingVertical: responsiveSize(14),
    paddingHorizontal: responsiveSize(12),
    gap: responsiveSize(10),
  },
  responseBody: {
    flex: 1,
  },
  responseTitle: {
    fontSize: responsiveFontSize(17),
    fontWeight: "700",
    color: "#161d21",
  },
  responseDetail: {
    fontSize: responsiveFontSize(13),
    color: "#5b4040",
  },
  responseCount: {
    fontSize: responsiveFontSize(30),
    fontWeight: "800",
    color: "#9d0028",
  },
});
