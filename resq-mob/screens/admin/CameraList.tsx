// screens/admin/CameraList.tsx
import React from "react";
import { View, Text } from "react-native";
import { commonScreenStyles as styles } from "../../styles/screens/admin/commonScreenStyles";
import Layout from "../../components/admin/Layout";

export default function CameraList() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.text}>Camera List (Admin Mock Screen)</Text>
      </View>
    </Layout>
  );
}