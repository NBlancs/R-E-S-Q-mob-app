// screens/admin/Profile.tsx
import React from "react";
import { View, Text } from "react-native";
import { commonScreenStyles as styles } from "../../styles/screens/admin/commonScreenStyles";
import Layout from "../../components/admin/Layout";

export default function Profile() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.text}>Profile (Admin Mock Screen)</Text>
      </View>
    </Layout>
  );
}