import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Line,
  Path,
  Polyline,
  Stop,
} from "react-native-svg";
import Layout from "../../components/admin/Layout";
import { reportsScreenStyles as styles } from "../../styles/screens/admin/reports";

const allocationData = [
  { label: "Field Agents", value: 82, color: "#9d0028" },
  { label: "Medical Units", value: 45, color: "#236580" },
  { label: "Drone Recon", value: 68, color: "#99004e" },
  { label: "Command Ops", value: 94, color: "#c41c3b" },
];

const reports = [
  { name: "Weekly_Incident_Wrap_05.pdf", meta: "May 24, 2024 - 2.4MB" },
  { name: "Resource_Usage_Q2.pdf", meta: "May 21, 2024 - 1.8MB" },
  { name: "Environmental_Audit_B.pdf", meta: "May 19, 2024 - 4.1MB" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}

function IncidentChart() {
  return (
    <View style={styles.chartWrap}>
      <Svg width="100%" height="100%" viewBox="0 0 900 280" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="incidentFill" x1="0" x2="0" y1="0" y2="1">
            <Stop offset="0" stopColor="#c41c3b" stopOpacity="0.28" />
            <Stop offset="1" stopColor="#c41c3b" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Line x1="0" x2="900" y1="70" y2="70" stroke="#e2e9ef" strokeWidth="2" />
        <Line x1="0" x2="900" y1="140" y2="140" stroke="#e2e9ef" strokeWidth="2" />
        <Line x1="0" x2="900" y1="210" y2="210" stroke="#e2e9ef" strokeWidth="2" />
        <Path
          d="M0,180 L150,160 L300,190 L450,100 L600,140 L750,80 L900,120 L900,280 L0,280 Z"
          fill="url(#incidentFill)"
        />
        <Polyline
          points="0,180 150,160 300,190 450,100 600,140 750,80 900,120"
          fill="none"
          stroke="#c41c3b"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        {[["0", "180"], ["150", "160"], ["300", "190"], ["450", "100"], ["600", "140"], ["750", "80"], ["900", "120"]].map(
          ([cx, cy]) => (
            <Circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="8" fill="#f4faff" stroke="#c41c3b" strokeWidth="4" />
          ),
        )}
      </Svg>
      <View style={styles.chartDays}>
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <Text key={day} style={styles.chartDay}>
            {day}
          </Text>
        ))}
      </View>
    </View>
  );
}

function AllocationBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <View style={styles.allocationItem}>
      <View style={styles.allocationHeader}>
        <Text style={styles.allocationLabel}>{label}</Text>
        <Text style={styles.allocationLabel}>{value}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

function RiskTile({
  icon,
  label,
  value,
  status,
  isCritical,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
  status: string;
  isCritical?: boolean;
}) {
  return (
    <View style={styles.riskTile}>
      <View style={styles.riskTileHeader}>
        <MaterialIcons name={icon} size={24} color="#236580" />
        <Text style={styles.riskLabel}>{label}</Text>
      </View>
      <Text style={styles.riskValue}>{value}</Text>
      <Text style={[styles.riskStatus, isCritical && styles.riskStatusCritical]}>{status}</Text>
    </View>
  );
}

export default function Reports() {
  return (
    <Layout>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Reports & Analytics</Text>
          <Text style={styles.pageSubtitle}>
            Command oversight for historical incident summaries and environmental trend data.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <SectionLabel>System Telemetry</SectionLabel>
              <Text style={styles.cardTitle}>Weekly Incident Volume</Text>
            </View>
            <View style={styles.metricBlock}>
              <Text style={styles.metricValue}>+12.5%</Text>
              <Text style={styles.metricLabel}>vs. prev week</Text>
            </View>
          </View>
          <IncidentChart />
        </View>

        <View style={styles.card}>
          <SectionLabel>Asset Deployment</SectionLabel>
          <Text style={styles.cardTitle}>Resource Allocation</Text>
          <View style={styles.allocationList}>
            {allocationData.map((item) => (
              <AllocationBar key={item.label} {...item} />
            ))}
          </View>
          <View style={styles.commandNote}>
            <Text style={styles.commandNoteText}>
              High deployment detected in Sector 7G. Advise standby for reserve units.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Environmental Risk Factors</Text>
          <View style={styles.riskGrid}>
            <RiskTile
              icon="device-thermostat"
              label="Thermal Avg"
              value="38.4 C"
              status="Critical Increase"
              isCritical
            />
            <RiskTile icon="air" label="AQI Index" value="142" status="Moderate" />
          </View>
          <TouchableOpacity style={styles.secondaryAction} activeOpacity={0.85}>
            <MaterialIcons name="analytics" size={20} color="#ffffff" />
            <Text style={styles.secondaryActionText}>View Environmental Detail</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.synthesisCard]}>
          <View style={styles.synthesisIcon}>
            <MaterialIcons name="description" size={36} color="#9d0028" />
          </View>
          <Text style={styles.cardTitle}>Daily Mission Synthesis</Text>
          <Text style={styles.synthesisText}>
            Automated AI synthesis of all active sector logs and triage reports.
          </Text>
          <TouchableOpacity style={styles.primaryAction} activeOpacity={0.85}>
            <Text style={styles.primaryActionText}>Generate Mission Summary</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reportsSection}>
          <View style={styles.reportsHeader}>
            <Text style={styles.cardTitle}>Downloadable PDF Reports</Text>
            <TouchableOpacity style={styles.viewAllButton} activeOpacity={0.75}>
              <Text style={styles.viewAllText}>View All</Text>
              <MaterialIcons name="chevron-right" size={18} color="#9d0028" />
            </TouchableOpacity>
          </View>

          {reports.map((report) => (
            <TouchableOpacity key={report.name} style={styles.reportRow} activeOpacity={0.78}>
              <View style={styles.pdfIconBox}>
                <MaterialIcons name="picture-as-pdf" size={24} color="#9d0028" />
              </View>
              <View style={styles.reportTextBlock}>
                <Text style={styles.reportName} numberOfLines={1}>
                  {report.name}
                </Text>
                <Text style={styles.reportMeta}>{report.meta}</Text>
              </View>
              <MaterialIcons name="file-download" size={24} color="#5b4040" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.commandFooter}>v2.4.0 - R-E-S-Q Command Administrator Console</Text>
      </ScrollView>
    </Layout>
  );
}
