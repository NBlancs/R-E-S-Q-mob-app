import React, { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { DomainNavItem } from "./DomainHeader";
import { responsiveFontSize, responsiveSize } from "../../../utils/responsive";
import { useAuth } from "../../../hooks/useAuth";

interface HamburgerSidebarProps {
  navItems: DomainNavItem[];
  activeRoute: string;
  onNavigate: (route: string) => void;
  panelTitle?: string;
  profileRoute: string;
  profileLabel?: string;
}

export default function HamburgerSidebar({
  navItems,
  activeRoute,
  onNavigate,
  panelTitle = "Menu",
  profileRoute,
  profileLabel = "Profile",
}: HamburgerSidebarProps) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleNavigate = (route: string) => {
    setOpen(false);
    onNavigate(route);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          setOpen(false);
          logout();
        },
      },
    ]);
  };

  return (
    <View>
      <TouchableOpacity style={styles.iconButton} onPress={() => setOpen(true)}>
        <Ionicons name="menu" size={20} color="#9d0028" />
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.rootOverlay}>
          <Pressable style={styles.overlayHitArea} onPress={() => setOpen(false)} />

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>{panelTitle}</Text>
            <ScrollView>
              {navItems.map((item) => {
                const active = activeRoute === item.route;
                return (
                  <TouchableOpacity
                    key={item.route}
                    style={[styles.navItem, active ? styles.navItemActive : null]}
                    onPress={() => handleNavigate(item.route)}
                  >
                    <Text style={[styles.navItemText, active ? styles.navItemTextActive : null]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity
                style={[styles.navItem, activeRoute === profileRoute ? styles.navItemActive : null]}
                onPress={() => handleNavigate(profileRoute)}
              >
                <Text
                  style={[styles.navItemText, activeRoute === profileRoute ? styles.navItemTextActive : null]}
                >
                  {profileLabel}
                </Text>
              </TouchableOpacity>

              <View style={styles.divider} />
              <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={16} color="#fca5a5" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: responsiveSize(36),
    height: responsiveSize(36),
    borderRadius: responsiveSize(8),
    borderWidth: 1,
    borderColor: "#e3bebe",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4faff",
  },
  rootOverlay: {
    flex: 1,
    flexDirection: "row",
  },
  overlayHitArea: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  panel: {
    width: responsiveSize(250),
    backgroundColor: "#ffffff",
    paddingTop: responsiveSize(52),
    paddingHorizontal: responsiveSize(12),
    borderLeftWidth: 1,
    borderLeftColor: "#e3bebe",
  },
  panelTitle: {
    color: "#161d21",
    fontSize: responsiveFontSize(18),
    fontWeight: "700",
    marginBottom: responsiveSize(12),
  },
  navItem: {
    borderRadius: responsiveSize(8),
    borderWidth: 1,
    borderColor: "#e3bebe",
    marginBottom: responsiveSize(8),
    paddingVertical: responsiveSize(10),
    paddingHorizontal: responsiveSize(10),
  },
  navItemActive: {
    borderColor: "#9d0028",
    backgroundColor: "#ffdada",
  },
  navItemText: {
    color: "#5b4040",
    fontSize: responsiveFontSize(14),
    fontWeight: "600",
  },
  navItemTextActive: {
    color: "#9d0028",
  },
  divider: {
    height: 1,
    backgroundColor: "#e3bebe",
    marginVertical: responsiveSize(12),
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveSize(8),
    borderRadius: responsiveSize(8),
    borderWidth: 1,
    borderColor: "#e3bebe",
    backgroundColor: "#fff1f2",
    paddingVertical: responsiveSize(10),
    paddingHorizontal: responsiveSize(10),
    marginBottom: responsiveSize(8),
  },
  logoutText: {
    color: "#9d0028",
    fontSize: responsiveFontSize(14),
    fontWeight: "600",
  },
});
