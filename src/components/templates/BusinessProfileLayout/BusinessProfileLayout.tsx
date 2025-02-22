import React from "react";
import Container from "@/components/atoms/Container/Container";
import BusinessInfo from "@/components/organisms/BusinessProfile/BusinessInfo";
import { BusinessInfoType } from "@/types/User";
import {
  fetchBusinessBranches,
  fetchBusinessinfo,
  userServices,
} from "@/services/user/user";
import { getProjects } from "@/services/Projects";

interface BusinessProfileLayoutPageProps {
  OverviewSection: React.FC<{
    businessInfo: BusinessInfoType;
    servicesData: any;
    projectsData: BusinessInfoType;
    branches: any;
  }>;
  userId: string;
}

const BusinessProfileLayout: React.FC<BusinessProfileLayoutPageProps> = async ({
  OverviewSection,
  userId,
}) => {
  const businessdata = await fetchBusinessinfo(userId);
  const servicesData = await userServices(userId);
  const businessInfo = businessdata.payload.data[0];
  const businessId = businessInfo?.id;
  const projectsData = await getProjects(businessId);
  const branchesData = await fetchBusinessBranches(userId);
  const branches = branchesData?.payload;
  return (
    <div className="bg-[#F6F7FC]">
      <Container>
        <div>
          <BusinessInfo businessInfo={businessInfo} />
          <div className="form-container">
            <OverviewSection
              branches={branches}
              businessInfo={businessInfo}
              servicesData={servicesData}
              projectsData={projectsData}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BusinessProfileLayout;
