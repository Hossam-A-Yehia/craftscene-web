import React from "react";
import BusinessProfileLayout from "@/components/templates/BusinessProfileLayout/BusinessProfileLayout";
import OverviewSection from "@/components/organisms/BusinessProfile/OverviewSection";

const Profile = ({ userId }: { userId: string }) => {
  return (
    <BusinessProfileLayout OverviewSection={OverviewSection} userId={userId} />
  );
};

export default Profile;
