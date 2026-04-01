// screens/admin/CameraFeed.tsx
import React from "react";
import { ScrollView, Text, View } from "react-native";
import CameraFeedPanel from "../../components/admin/CameraFeedPanel";
import Layout from "../../components/admin/Layout";
import { cameraScreenStyles as styles } from "../../styles/screens/admin/camera";

export default function CameraFeed() {
  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Camera Preview</Text>
          <CameraFeedPanel />
        </View>
      </ScrollView>
    </Layout>
  );
}