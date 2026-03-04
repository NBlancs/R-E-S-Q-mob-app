// screens/admin/CameraFeed.tsx
import React from "react";
import { View, Text } from "react-native";
import { commonScreenStyles as styles } from "../../styles/screens/admin/commonScreenStyles";
import Layout from "../../components/admin/Layout";

export default function CameraFeed() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.text}>Camera Feed (Admin Mock Screen)</Text>
      </View>
    </Layout>
  );
}