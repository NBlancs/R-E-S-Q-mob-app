import React from "react";
import { Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";

export interface DomainFooterStyles {
  container: StyleProp<ViewStyle>;
  content: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
}

interface DomainFooterProps {
  footerText: string;
  styles: DomainFooterStyles;
}

export default function DomainFooter({ footerText, styles }: DomainFooterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>{footerText}</Text>
      </View>
    </View>
  );
}
