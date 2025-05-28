"use client";
import React, { useState } from "react";
import Tabs from "@/components/molecules/Tabs/Tabs";
import ServiceGrid from "../ServiceGrid/ServiceGrid";
import ProjectGrid from "../ProjectGrid/ProjectGrid";
import About from "./About";
import NoDataSection from "@/components/molecules/NoDate/NoDate";
import { BusinessInfoType, ServicesData } from "@/types/User";
import Branches from "./Branches";
import { SERVICE_PROVIDER_FREELANCE, SUPPLIER } from "@/constants/constants";
import { Branch } from "@/types/Branches";
import { useTranslation } from "react-i18next";

export default function OverviewSection({
  businessInfo,
  servicesData,
  projectsData,
  branches,
}: {
  businessInfo: BusinessInfoType;
  servicesData: ServicesData;
  projectsData: BusinessInfoType;
  branches: Branch[];
}) {
  const userType = businessInfo?.user?.user_type;
const { t } = useTranslation();
  const TABS = {
    ABOUT: t("business_profile.about"),
    SERVICE:
      userType === SUPPLIER
        ? t("Products group")
        : t("business_profile.services"),
    PROJECTS: t("business_profile.projects"),
    BRANCHES: t("Branches"),
  };
  let filteredTabs;
  if (userType === SUPPLIER) {
    filteredTabs = {
      ABOUT: TABS.ABOUT,
      SERVICE: TABS.SERVICE,
      BRANCHES: TABS.BRANCHES,
    };
  } else if (userType === SERVICE_PROVIDER_FREELANCE) {
    filteredTabs = {
      ABOUT: TABS.ABOUT,
      SERVICE: TABS.SERVICE,
      PROJECTS: TABS.PROJECTS,
    };
  } else {
    filteredTabs = TABS;
  }

  const [activeTab, setActiveTab] = useState(Object.values(filteredTabs)[0]);

  const services = servicesData?.payload?.data || [];
  const projects = projectsData?.payload || [];

  const renderTabContent = () => {
    if (activeTab === TABS.SERVICE) {
      if (services.length === 0) return <NoDataSection />;
      return <ServiceGrid services={services} userType={userType} />;
    }
    if (activeTab === TABS.PROJECTS) {
      if (projects.length === 0) return <NoDataSection />;
      return <ProjectGrid projects={projects} />;
    }
    if (activeTab === TABS.ABOUT) {
      return <About businessInfo={businessInfo} />;
    }
    if (activeTab === TABS.BRANCHES) {
      if (branches.length === 0) return <NoDataSection />;
      return <Branches branches={branches} />;
    }
    return null;
  };

  return (
    <div className="mt-[150px]">
      <Tabs
        tabs={Object.values(filteredTabs)}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      {renderTabContent()}
    </div>
  );
}
