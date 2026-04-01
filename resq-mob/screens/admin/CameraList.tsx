// screens/admin/CameraList.tsx
import React from "react";
import { ScrollView, Text, View } from "react-native";
import CameraPanel from "../../components/admin/CameraPanel";
import Layout from "../../components/admin/Layout";
import { cameraScreenStyles as styles } from "../../styles/screens/admin/camera";

export default function CameraList() {
  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Cameras</Text>
          <CameraPanel />
        </View>
      </ScrollView>
    </Layout>
  );
}