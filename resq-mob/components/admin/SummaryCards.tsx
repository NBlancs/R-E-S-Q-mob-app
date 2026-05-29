import React from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import {
  ADMIN_OVERVIEW_TREND_POINTS,
  ADMIN_RESPONSE_STATUS,
  ADMIN_SENSOR_BREAKDOWN,
} from "../../constants/adminReports";
import type { SystemOverview } from "../../services/api";
import { summaryCardsStyles as styles } from "../../styles/components/admin/summaryCards";

interface SummaryCardsProps {
  overview?: SystemOverview | null;
  loadingOverview?: boolean;
}

export default function SummaryCards({ overview, loadingOverview = false }: SummaryCardsProps) {
  const { width } = useWindowDimensions();
  const chartWidth = Math.max(220, Math.min(width - 82, 420));

  const temperatureSeries = ADMIN_OVERVIEW_TREND_POINTS.map((point) => point.temperature);
  const smokeSeries = ADMIN_OVERVIEW_TREND_POINTS.map((point) => point.smokeDensity);
  const totalSensors = ADMIN_SENSOR_BREAKDOWN.reduce((sum, item) => sum + item.value, 0);

  const trendChartData = {
    labels: ADMIN_OVERVIEW_TREND_POINTS.map((point) => point.label),
    datasets: [
      {
        data: temperatureSeries,
        color: () => "#c41c3b",
        strokeWidth: 2,
      },
      {
        data: smokeSeries,
        color: () => "#236580",
        strokeWidth: 2,
      },
    ],
    legend: ["Temperature (°C)    ", "Smoke / PM Density"],
  };

  const sensorPieData = ADMIN_SENSOR_BREAKDOWN.map((item) => ({
    name: item.label,
    population: item.value,
    color: item.color,
    legendFontColor: "#161d21",
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Live System Overview</Text>
        <Text style={styles.subtitle}>
          {loadingOverview ? "Refreshing from backend..." : "Counts synchronized from the backend API"}
        </Text>
        <View style={styles.statTiles}>
          <View style={styles.statTile}>
            <Text style={styles.statTileLabel}>Cameras</Text>
            <Text style={styles.statTileValue}>
              {overview?.camera_count ?? "-"}
            </Text>
          </View>
          <View style={styles.statTile}>
            <Text style={styles.statTileLabel}>Incidents</Text>
            <Text style={styles.statTileValue}>
              {overview?.incident_count ?? "-"}
            </Text>
          </View>
          <View style={styles.statTile}>
            <Text style={styles.statTileLabel}>Open / Investigating</Text>
            <Text style={[styles.statTileValue, styles.statTileValueAlert]}>
              {overview?.open_incidents ?? "-"}
            </Text>
          </View>
          <View style={styles.statTile}>
            <Text style={styles.statTileLabel}>Resolved</Text>
            <Text style={[styles.statTileValue, styles.statTileValueResolved]}>
              {overview?.resolved_incidents ?? "-"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Temperature &amp; Air Quality Trends</Text>
        <Text style={styles.subtitle}>Average values across key zones (last 24 hours)</Text>

        <LineChart
          data={trendChartData}
          width={chartWidth}
          height={220}
          fromZero
          withInnerLines={false}
          withOuterLines
          withShadow={false}
          chartConfig={{
            backgroundColor: "#eef4fa",
            backgroundGradientFrom: "#eef4fa",
            backgroundGradientTo: "#eef4fa",
            decimalPlaces: 0,
            color: () => "#161d21",
            labelColor: () => "#5b4040",
            propsForDots: {
              r: "4",
              strokeWidth: "1",
                stroke: "#ffffff",
            },
          }}
          style={styles.chartKitContainer}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Sensor Health Breakdown</Text>
        <Text style={styles.subtitle}>Distribution of {totalSensors} active sensors</Text>

        <View style={styles.sensorRow}>
          <View style={styles.donutWrap}>
            <PieChart
              data={sensorPieData}
              width={chartWidth > 360 ? 240 : 190}
              height={170}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="16"
              hasLegend={false}
              chartConfig={{
                color: () => "#161d21",
                labelColor: () => "#5b4040",
              }}
              center={[10, 0]}
              absolute
            />
          </View>

          <View style={styles.sensorLegendList}>
            {ADMIN_SENSOR_BREAKDOWN.map((item) => (
              <View key={item.label} style={styles.sensorLegendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.sensorLegendLabel}>{item.label}</Text>
                <Text style={styles.sensorLegendValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Response Team Status</Text>
        <Text style={styles.subtitle}>Current availability and assignment by zone</Text>

        <View style={styles.responseList}>
          {ADMIN_RESPONSE_STATUS.map((item) => (
            <View style={styles.responseItem} key={item.label}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <View style={styles.responseBody}>
                <Text style={styles.responseTitle}>{item.label}</Text>
                <Text style={styles.responseDetail}>{item.detail}</Text>
              </View>
              <Text style={styles.responseCount}>{item.count}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
