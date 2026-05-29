import React from "react";
import DomainFooter from "../shared/layout/DomainFooter";
import { footerStyles as styles } from "../../styles/components/admin/footer";

export default function Footer() {
  return (
    <DomainFooter footerText="v2.4.0 - R-E-S-Q Command Administrator Console" styles={styles} />
  );
}
