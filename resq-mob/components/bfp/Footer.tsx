import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { footerStyles as styles } from "../../styles/components/bfp/footer";

export default function Footer() {
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
        <Text style={styles.text}>v1.0.0 • BFP Operations</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}