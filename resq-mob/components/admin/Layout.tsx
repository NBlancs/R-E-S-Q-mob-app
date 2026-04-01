import React, { ReactNode } from "react";
import SharedLayout from "../shared/layout/SharedLayout";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return <SharedLayout HeaderComponent={Header} FooterComponent={Footer}>{children}</SharedLayout>;
}