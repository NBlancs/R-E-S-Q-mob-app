import React from "react";
import { View, Text } from "react-native";
import { simpleHeaderStyles as styles } from "../../styles/components/admin/simpleHeader";

interface SimpleHeaderProps {
  title: string;
}

export default function SimpleHeader({ title }: SimpleHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
