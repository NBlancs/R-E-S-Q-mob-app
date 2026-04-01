import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  ADMIN_CAMERA_NOTIFICATIONS,
  type CameraDetectionNotification,
} from "../../constants/adminCameras";
import { headerStyles as styles } from "../../styles/components/bfp/header";

interface NotificationBellProps {
  notifications?: CameraDetectionNotification[];
}

export default function NotificationBell({
  notifications = ADMIN_CAMERA_NOTIFICATIONS,
}: NotificationBellProps) {
  const { width, height } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CameraDetectionNotification[]>(notifications);

  const unreadCount = items.length;

  const acknowledge = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.notificationsRoot}>
      <TouchableOpacity style={styles.notificationButton} onPress={() => setOpen((prev) => !prev)}>
        <Ionicons name="notifications" size={18} color="#ffffff" />
        {unreadCount > 0 ? (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
          </View>
        ) : null}
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.notificationsModalOverlay} onPress={() => setOpen(false)}>
          <Pressable
            style={[
              styles.notificationsModalPanel,
              {
                width: Math.min(width - 24, 420),
                maxHeight: Math.min(Math.round(height * 0.75), 520),
              },
            ]}
            onPress={() => {}}
          >
            <Text style={styles.notificationsTitle}>Detection Alerts</Text>
            <ScrollView style={styles.notificationsScroll}>
              {items.map((item) => (
                <View style={styles.notificationItem} key={item.id}>
                  <View style={styles.notificationItemBody}>
                    <Text style={styles.notificationType}>{item.detection.toUpperCase()}</Text>
                    <Text style={styles.notificationText}>{item.message}</Text>
                    <Text style={styles.notificationMeta}>{item.timestamp}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.ackButton}
                    onPress={() => acknowledge(item.id)}
                  >
                    <Text style={styles.ackButtonText}>Acknowledge</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
