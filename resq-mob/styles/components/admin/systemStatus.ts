import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";

export const systemStatusStyles = StyleSheet.create({
  container: {
    padding: responsiveSize(18),
    backgroundColor: "#ffffff",
    borderRadius: responsiveSize(12),
    borderWidth: 1,
    borderColor: "#e3bebe",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  heading: {
    fontSize: responsiveFontSize(18),
    fontWeight: "700",
    marginBottom: responsiveSize(12),
    color: "#161d21",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eef4fa",
    borderWidth: 1,
    borderColor: "#e3bebe",
    borderRadius: responsiveSize(8),
    padding: responsiveSize(12),
    marginBottom: responsiveSize(10),
  },
  serviceName: {
    fontSize: responsiveFontSize(13),
    fontWeight: "700",
    color: "#161d21",
    flex: 1,
    marginRight: responsiveSize(12),
  },
  statusText: {
    fontSize: responsiveFontSize(12),
    fontWeight: "800",
    textTransform: "uppercase",
  },
});
