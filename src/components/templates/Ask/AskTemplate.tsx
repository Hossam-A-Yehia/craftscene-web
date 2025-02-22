"use client";
import { FC, useState } from "react";
import { useFetchQuotations } from "@/hooks/useRfqs";
import NoData from "@/components/molecules/NoDate/NoDate";
import Loader from "@/components/atoms/Loader/Loader";
import { useFetchUser } from "@/hooks/useUser";
import { t } from "i18next";
import { useFetchMyAsks } from "@/hooks/useAsks";
import { Ask } from "@/types/Ask";
import AskDetails from "@/components/organisms/AskDetails/AskDetails";
import RepliesGrid from "@/components/organisms/RepliesGrid/RepliesGrid";

interface RFQTemplateProps {
  askId: string;
}
enum Tabs {
  DETAILS = "details",
  REPLIES = "replies",
}
const AskTemplate: FC<RFQTemplateProps> = ({ askId }) => {
  const { data: userData } = useFetchUser();

  const { data: AsksData, isLoading } = useFetchMyAsks(askId, true);
  const { data: replies } = useFetchQuotations({
    discussionable_id: String(askId),
    user_id: userData?.id,
    discussionable_type: 2,
  });

  const ask: Ask = AsksData?.data[0];
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.DETAILS);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!ask) {
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
            {t("ask_details.title")}
          </h1>
          <p className="text-gray-600">
            All the Lorem Ipsum generators on the Internet tend to repeat.
          </p>
        </div>

        <div className="flex justify-start items-center gap-3 mb-6">
          <button
            data-testid="details-tab"
            onClick={() => setActiveTab(Tabs.DETAILS)}
            className={`px-4 py-2 rounded-t-lg duration-300 ${
              activeTab === Tabs.DETAILS
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {t("ask_details.details")}
          </button>
          <button
            data-testid="replies-tab"
            onClick={() => setActiveTab(Tabs.REPLIES)}
            className={`px-4 py-2 rounded-t-lg duration-300 ${
              activeTab === Tabs.REPLIES
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {t("ask_details.replies")}
          </button>
        </div>

        <div data-testid="ask-details">
          {activeTab === Tabs.DETAILS && <AskDetails ask={ask} />}
        </div>
        <div data-testid="replies-grid">
          {activeTab === Tabs.REPLIES && <RepliesGrid replies={replies} />}
        </div>
      </div>
    </div>
  );
};

export default AskTemplate;
