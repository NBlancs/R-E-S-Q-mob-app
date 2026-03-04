import React, { ReactNode } from "react";
import { View } from "react-native";
import { responsiveSize } from "../../utils/responsive";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, padding: responsiveSize(16) }}>{children}</View>
      <Footer />
    </View>
  );
}