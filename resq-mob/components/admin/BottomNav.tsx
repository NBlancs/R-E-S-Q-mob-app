import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { bottomNavStyles as styles } from "../../styles/components/admin/bottomNav";

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

export default function BottomNav() {
  const navigation = useNavigation<any>();
  const [activeNav, setActiveNav] = useState("Overview");

  const navItems: NavItem[] = [
    { label: "Overview", icon: "🔥", route: "Overview" },
    { label: "Cameras", icon: "📹", route: "CameraList" },
    { label: "Reports", icon: "📊", route: "Reports" },
    { label: "Settings", icon: "⚙️", route: "Profile" },
  ];

  const handlePress = (route: string, label: string) => {
    setActiveNav(label);
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.route}
          style={styles.navItem}
          onPress={() => handlePress(item.route, item.label)}
        >
          <Text style={styles.icon}>{item.icon}</Text>
          <Text
            style={[
              styles.label,
              activeNav === item.label && styles.labelActive,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

