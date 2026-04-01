import React from "react";
import { Alert, Text, TouchableOpacity, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { useAuth } from "../../../hooks/useAuth";

export interface DomainFooterStyles {
  container: StyleProp<ViewStyle>;
  content: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
  logoutButton: StyleProp<ViewStyle>;
  logoutText: StyleProp<TextStyle>;
}

interface DomainFooterProps {
  footerText: string;
  styles: DomainFooterStyles;
}

export default function DomainFooter({ footerText, styles }: DomainFooterProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Logout",
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>{footerText}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
