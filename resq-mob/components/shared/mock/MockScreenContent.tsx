import React from "react";
import { Text, View } from "react-native";
import { commonScreenStyles as styles } from "../../../styles/screens/admin/commonScreenStyles";

interface MockScreenContentProps {
  message: string;
}

export default function MockScreenContent({ message }: MockScreenContentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
