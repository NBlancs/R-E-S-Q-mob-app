import React from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import {
  ADMIN_OVERVIEW_TREND_POINTS,
  ADMIN_RESPONSE_STATUS,
  ADMIN_SENSOR_BREAKDOWN,
} from "../../constants/adminReports";
import { summaryCardsStyles as styles } from "../../styles/components/admin/summaryCards";

export default function SummaryCards() {
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
        color: () => "#2d80c3",
        strokeWidth: 2,
      },
      {
        data: smokeSeries,
        color: () => "#e67e22",
        strokeWidth: 2,
      },
    ],
    legend: ["Temperature (°C)    ", "Smoke / PM Density"],
  };

  const sensorPieData = ADMIN_SENSOR_BREAKDOWN.map((item) => ({
    name: item.label,
    population: item.value,
    color: item.color,
    legendFontColor: "#334155",
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
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
            backgroundColor: "#f5f6f7",
            backgroundGradientFrom: "#f5f6f7",
            backgroundGradientTo: "#f5f6f7",
            decimalPlaces: 0,
            color: () => "#334155",
            labelColor: () => "#6b7280",
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
                color: () => "#334155",
                labelColor: () => "#6b7280",
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