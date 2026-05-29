// screens/admin/Profile.tsx
import React from "react";
import OperationsProfile from "../../components/shared/profile/OperationsProfile";
import { ADMIN_PROFILE_DATA } from "../../constants/profileData";
import Layout from "../../components/admin/Layout";

export default function Profile() {
  return (
    <Layout>
      <OperationsProfile profileData={ADMIN_PROFILE_DATA} />
    </Layout>
  );
}