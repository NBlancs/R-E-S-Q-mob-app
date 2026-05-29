import React from "react";
import OperationsProfile from "../../components/shared/profile/OperationsProfile";
import { BFP_PROFILE_DATA } from "../../constants/profileData";
import Layout from "../../components/bfp/Layout";

export default function Profile() {
  return (
    <Layout>
      <OperationsProfile profileData={BFP_PROFILE_DATA} />
    </Layout>
  );
}