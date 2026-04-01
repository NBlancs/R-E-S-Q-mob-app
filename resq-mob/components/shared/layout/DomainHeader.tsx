import React from "react";
import { ScrollView, Text, TouchableOpacity, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

export interface DomainNavItem {
  label: string;
  route: string;
}

export interface DomainHeaderStyles {
  container: StyleProp<ViewStyle>;
  title: StyleProp<TextStyle>;
  navRow: StyleProp<ViewStyle>;
  navScroll: StyleProp<ViewStyle>;
  navButton: StyleProp<ViewStyle>;
  navButtonText: StyleProp<TextStyle>;
  profileButton: StyleProp<ViewStyle>;
  profileButtonText: StyleProp<TextStyle>;
}

interface DomainHeaderProps {
  title: string;
  navItems: DomainNavItem[];
  profileRoute: string;
  styles: DomainHeaderStyles;
}

export default function DomainHeader({
  title,
  navItems,
  profileRoute,
  styles,
}: DomainHeaderProps) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

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
          onPress={() => navigation.navigate(profileRoute)}
        >
          <Text style={styles.profileButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
