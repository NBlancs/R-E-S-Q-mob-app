import React from "react";
import DomainFooter from "../shared/layout/DomainFooter";
import { footerStyles as styles } from "../../styles/components/bfp/footer";

export default function Footer() {
  return (
    <DomainFooter footerText="v1.0.0 • BFP Operations" styles={styles} />
  );
}