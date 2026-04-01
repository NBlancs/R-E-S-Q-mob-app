import React, { type ReactNode, type ComponentType } from "react";
import { View } from "react-native";
import { responsiveSize } from "../../../utils/responsive";

interface SharedLayoutProps {
  children: ReactNode;
  HeaderComponent: ComponentType;
  FooterComponent: ComponentType;
}

export default function SharedLayout({
  children,
  HeaderComponent,
  FooterComponent,
}: SharedLayoutProps) {
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent />
      <View style={{ flex: 1, padding: responsiveSize(16) }}>{children}</View>
      <FooterComponent />
    </View>
  );
}
