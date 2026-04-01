import React from "react";
import DomainHeader from "../shared/layout/DomainHeader";
import { ADMIN_NAV_ITEMS, SCREEN_NAMES } from "../../constants/navigation";
import { headerStyles as styles } from "../../styles/components/admin/header";
import NotificationBell from "./NotificationBell";

export default function Header() {
  return (
    <DomainHeader
      title="Admin Dashboard"
      navItems={ADMIN_NAV_ITEMS}
      profileRoute={SCREEN_NAMES.PROFILE}
      styles={styles}
      rightAccessory={<NotificationBell />}
      profileLabel="Admin"
    />
  );
}