import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const summaryCardsStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: responsiveSize(10),
    marginBottom: responsiveSize(16),
  },
  card: {
    width: "100%",
    backgroundColor: "#f5f6f7",
    borderWidth: 1,
    borderColor: "#dde2e7",
    borderRadius: responsiveSize(10),
    padding: responsiveSize(12),
    marginBottom: responsiveSize(12),
  },
  title: {
    fontSize: responsiveFontSize(18),
    fontWeight: "700",
    color: "#4b5563",
  },
  subtitle: {
    marginTop: responsiveSize(8),
    marginBottom: responsiveSize(14),
    fontSize: responsiveFontSize(14),
    color: "#76818f",
  },
  chartKitContainer: {
    marginTop: responsiveSize(4),
    borderRadius: responsiveSize(8),
    paddingRight: responsiveSize(0),
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
    marginTop: responsiveSize(8),
    gap: responsiveSize(6),
  },
  donutWrap: {
    width: "100%",
    height: responsiveSize(170),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  sensorLegendList: {
    width: "100%",
    gap: responsiveSize(10),
  },
  sensorLegendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveSize(8),
  },
  sensorLegendLabel: {
    flex: 1,
    fontSize: responsiveFontSize(15),
    color: "#334155",
  },
  sensorLegendValue: {
    fontSize: responsiveFontSize(15),
    fontWeight: "700",
    color: "#334155",
  },
  responseList: {
    marginTop: responsiveSize(46),
    gap: responsiveSize(12),
  },
  responseItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#dde2e7",
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
    color: "#334155",
  },
  responseDetail: {
    fontSize: responsiveFontSize(13),
    color: "#6b7280",
  },
  responseCount: {
    fontSize: responsiveFontSize(30),
    fontWeight: "700",
    color: "#334155",
  },
});
