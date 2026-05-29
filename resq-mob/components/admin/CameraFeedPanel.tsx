import React from "react";
import { Text, View } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  ADMIN_CAMERA_FEED_EVENTS,
  type CameraFeedEvent,
} from "../../constants/adminCameras";
import { cameraPanelStyles as styles } from "../../styles/components/admin/cameraPanel";

interface CameraFeedPanelProps {
  events?: CameraFeedEvent[];
}

const detectionColorMap: Record<CameraFeedEvent["detection"], string> = {
  fire: "#ef4444",
  gas: "#f59e0b",
  smoke: "#fb923c",
  none: "#64748b",
};

export default function CameraFeedPanel({
  events = ADMIN_CAMERA_FEED_EVENTS,
}: CameraFeedPanelProps) {
  const liveEvent = events[0];
  const player = useVideoPlayer(require("../../assets/testvideo.mp4"), (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.muted = true;
    videoPlayer.play();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live Camera Preview</Text>

      {liveEvent ? (
        <View style={styles.feedCard}>
          <VideoView style={styles.feedImage} contentFit="cover" player={player} nativeControls />
          <View style={styles.feedOverlay}>
            <Text style={styles.feedOverlayText}>
              {liveEvent.detection} {liveEvent.confidence.toFixed(2)}
            </Text>
          </View>
        </View>
      ) : null}

      <Text style={styles.subheading}>Recent detections</Text>
      {events.map((eventItem) => (
        <View style={styles.row} key={eventItem.id}>
          <View style={styles.rowHeader}>
            <Text style={styles.cameraName}>{eventItem.cameraName}</Text>
            <Text style={[styles.chip, { color: detectionColorMap[eventItem.detection] }]}>
              {eventItem.detection.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.cameraMeta}>Confidence: {(eventItem.confidence * 100).toFixed(0)}%</Text>
          <Text style={styles.cameraMeta}>Event ID: {eventItem.id}</Text>
          <Text style={styles.cameraMeta}>Captured at {eventItem.timestamp}</Text>
        </View>
      ))}
    </View>
  );
}
