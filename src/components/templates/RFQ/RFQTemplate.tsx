"use client";
import { FC, useState } from "react";
import { useFetchMyRFQs, useFetchQuotations } from "@/hooks/useRfqs";
import RFQDetails from "@/components/organisms/RFQDetails/RFQDetails";
import QuotationsGrid from "@/components/organisms/QuotationsGrid/QuotationsGrid";
import { RFQsType } from "@/types/RFQs";
import NoData from "@/components/molecules/NoDate/NoDate";
import Loader from "@/components/atoms/Loader/Loader";
import { t } from "i18next";
import { useUser } from "@/context/UserContext";

interface RFQTemplateProps {
  rfqId: string;
}
enum Tabs {
  DETAILS = "details",
  QUOTATIONS = "quotations",
}
const RFQTemplate: FC<RFQTemplateProps> = ({ rfqId }) => {
  const { userData } = useUser();

  const { data: RFQData, isLoading } = useFetchMyRFQs(rfqId, true);
  const { data: quotations } = useFetchQuotations({
    discussionable_id: String(rfqId),
    user_id: userData?.id ?? 0,
    discussionable_type: 1,
  });

  const rfq: RFQsType = RFQData?.data[0];
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.DETAILS);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!rfq) {
    return (
      <div>
        <NoData />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-[#F6F7FC]">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {t("rfq_details.title")}
          </h1>
          <p className="text-gray-600">
            All the Lorem Ipsum generators on the Internet tend to repeat.
          </p>
        </div>

        <div className="flex justify-start items-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab(Tabs.DETAILS)}
            className={`px-4 py-2 rounded-t-lg duration-300 ${
              activeTab === Tabs.DETAILS
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {t("rfq_details.about")}
          </button>
          <button
            onClick={() => setActiveTab(Tabs.QUOTATIONS)}
            className={`px-4 py-2 rounded-t-lg duration-300 ${
              activeTab === Tabs.QUOTATIONS
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {t("rfq_details.quotations")}
          </button>
        </div>

        <div>
          {activeTab === Tabs.DETAILS && <RFQDetails rfq={rfq} />}
          {activeTab === Tabs.QUOTATIONS && (
            <QuotationsGrid quotations={quotations} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RFQTemplate;
