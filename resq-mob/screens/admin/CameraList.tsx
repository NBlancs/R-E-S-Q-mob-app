// screens/admin/CameraList.tsx
import React from "react";
import { ScrollView, Text, View } from "react-native";
import CameraPanel from "../../components/admin/CameraPanel";
import Layout from "../../components/admin/Layout";
import { cameraScreenStyles as styles } from "../../styles/screens/admin/camera";

export default function CameraList() {
  return (
    <Layout>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Camera List</Text>
          <Text style={styles.pageSubtitle}>
            Manage camera units, active windows, locations, and operating status.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Cameras</Text>
          <CameraPanel />
        </View>
      </ScrollView>
    </Layout>
  );
}
