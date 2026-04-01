import React from "react";
import { Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import HamburgerSidebar from "./HamburgerSidebar";

export interface DomainNavItem {
  label: string;
  route: string;
}

export interface DomainHeaderStyles {
  container: StyleProp<ViewStyle>;
  title: StyleProp<TextStyle>;
  navRow: StyleProp<ViewStyle>;
  leftControls?: StyleProp<ViewStyle>;
  rightControls?: StyleProp<ViewStyle>;
}

interface DomainHeaderProps {
  title: string;
  navItems: DomainNavItem[];
  profileRoute: string;
  styles: DomainHeaderStyles;
  rightAccessory?: React.ReactNode;
  profileLabel?: string;
}

export default function DomainHeader({
  title,
  navItems,
  profileRoute,
  styles,
  rightAccessory,
  profileLabel = "Profile",
}: DomainHeaderProps) {
  const navigation = useNavigation<any>();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <View style={styles.navRow}>
        <View style={styles.leftControls}>
          <HamburgerSidebar
            navItems={navItems}
            activeRoute={route.name}
            onNavigate={(targetRoute) => navigation.navigate(targetRoute)}
            panelTitle={title}
            profileRoute={profileRoute}
            profileLabel={profileLabel}
          />
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightControls}>
          {rightAccessory}
        </View>
      </View>
    </View>
  );
}
