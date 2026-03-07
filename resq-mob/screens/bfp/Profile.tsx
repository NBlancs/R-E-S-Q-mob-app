// screens/bfp/Profile.tsx
import React from "react";
import { View, Text } from "react-native";
import { commonScreenStyles as styles } from "../../styles/screens/bfp/commonScreenStyles";
import Layout from "../../components/bfp/Layout";

export default function Profile() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.text}>Profile (BFP Mock Screen)</Text>
      </View>
    </Layout>
  );
}