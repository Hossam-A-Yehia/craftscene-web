import React from "react";
import BusinessProfileLayout from "@/components/templates/BusinessProfileLayout/BusinessProfileLayout";
import OverviewSection from "@/components/organisms/BusinessProfile/OverviewSection";

const Profile = ({ userId, from }: { userId: string; from?: string }) => {
  return (
    <BusinessProfileLayout 
      OverviewSection={OverviewSection} 
      userId={userId} 
      from={from}
    />
  );
};

export default Profile;
