import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { headerStyles as styles } from "../../styles/components/bfp/header";

export default function Header() {
  const navigation = useNavigation<any>();

  const navItems = [
    { label: "Incident Map", route: "IncidentMap" },
    { label: "Active Alerts", route: "AlertsList" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BFP Operations</Text>
      
      {/* Navigation Row with Profile Button */}
      <View style={styles.navRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.navScroll}
        >
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.route}
              style={styles.navButton}
              onPress={() => navigation.navigate(item.route)}
            >
              <Text style={styles.navButtonText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.profileButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}