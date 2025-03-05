"use client";
import React, { useState } from "react";
import { t } from "i18next";
import UpdateBusinessForm from "@/components/organisms/UpdateBusinessForm/UpdateBusinessForm";
import Text from "@/components/atoms/Text/Text";
import UpdateUserCategories from "@/components/organisms/UpdateUserCategories/UpdateUserCategories";
import UpdateUserServices from "@/components/organisms/UpdateUserServices/UpdateUserServices";
import { useBusinessForm } from "@/hooks/useBusinessForm";

enum Tabs {
  BUSINESS_INFO = "business info",
  CATEGORIES = "categories",
  SERVICES = "services",
}

const UpdateBusinessProfileTemplate = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.BUSINESS_INFO);
  const { isSupplier } = useBusinessForm();
  return (
    <div className="min-h-screen py-10 bg-[#F6F7FC]">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <Text
            testId="title"
            className="text-2xl font-bold text-gray-800 mb-2"
          >
            {t("update_business_info.title")}
          </Text>
          <p className="text-gray-600">{t("update_business_info.desc")}</p>
        </div>
        <div className="flex justify-start items-center gap-3 mb-6">
          <button
            data-testid="info"
            onClick={() => setActiveTab(Tabs.BUSINESS_INFO)}
            className={`px-4 py-2 rounded-t-lg duration-300 ${
              activeTab === Tabs.BUSINESS_INFO
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {t("update_business_info.title")}
          </button>
          <button
            data-testid="categories"
            onClick={() => setActiveTab(Tabs.CATEGORIES)}
            className={`px-4 py-2 rounded-t-lg duration-300 ${
              activeTab === Tabs.CATEGORIES
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {t("update_business_info.categories")}
          </button>
          <button
            data-testid="services"
            onClick={() => setActiveTab(Tabs.SERVICES)}
            className={`px-4 py-2 rounded-t-lg duration-300 ${
              activeTab === Tabs.SERVICES
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {isSupplier
              ? t("update_business_info.product_groups")
              : t("update_business_info.services")}
          </button>
        </div>
        <div>
          {activeTab === Tabs.BUSINESS_INFO && <UpdateBusinessForm />}
          {activeTab === Tabs.CATEGORIES && <UpdateUserCategories />}
          {activeTab === Tabs.SERVICES && <UpdateUserServices />}
        </div>
      </div>
    </div>
  );
};

export default UpdateBusinessProfileTemplate;
