import React from "react";
import { Text, View } from "react-native";
import {
  ADMIN_CAMERA_FEED_EVENTS,
  type CameraFeedEvent,
} from "../../constants/adminCameras";
import { cameraPanelStyles as styles } from "../../styles/components/admin/cameraPanel";

interface CameraFeedPanelProps {
  events?: CameraFeedEvent[];
}

const severityColorMap: Record<CameraFeedEvent["severity"], string> = {
  High: "#dc2626",
  Medium: "#d97706",
  Low: "#15803d",
};

export default function CameraFeedPanel({
  events = ADMIN_CAMERA_FEED_EVENTS,
}: CameraFeedPanelProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recent Feed Events</Text>
      {events.map((eventItem) => (
        <View style={styles.row} key={eventItem.id}>
          <View style={styles.rowHeader}>
            <Text style={styles.cameraName}>{eventItem.cameraName}</Text>
            <Text style={[styles.chip, { color: severityColorMap[eventItem.severity] }]}>
              {eventItem.severity}
            </Text>
          </View>

          <Text style={styles.cameraMeta}>{eventItem.eventLabel}</Text>
          <Text style={styles.cameraMeta}>Event ID: {eventItem.id}</Text>
          <Text style={styles.cameraMeta}>Captured at {eventItem.timestamp}</Text>
        </View>
      ))}
    </View>
  );
}
