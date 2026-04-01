import React from "react";
import DomainFooter from "../shared/layout/DomainFooter";
import { footerStyles as styles } from "../../styles/components/admin/footer";

export default function Footer() {
  return (
    <DomainFooter footerText="v1.0.0 • RESQ Admin" styles={styles}/>
  );
}