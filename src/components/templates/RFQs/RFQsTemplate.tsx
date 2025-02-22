"use client";
import Loader from "@/components/atoms/Loader/Loader";
import Text from "@/components/atoms/Text/Text";
import RFQsGrid from "@/components/organisms/RFQsGrid/RFQsGrid";
import { RFP_STATUS } from "@/constants/constants";
import { useFetchMyInvitations, useFetchMyRFQs } from "@/hooks/useRfqs";
import { RFQsType } from "@/types/RFQs";
import { t } from "i18next";
import React, { useState } from "react";

const RFQsTemplate = ({ isInvitation }: { isInvitation: boolean }) => {
  const [activeFilter, setActiveFilter] = useState(RFP_STATUS[0].value);
  const { data: RFQsData, isLoading: isRFQsLoading } = useFetchMyRFQs(
    null,
    !isInvitation
  );
  const { data: invitationsData, isLoading: isinvitationsLoading } =
    useFetchMyInvitations(null, isInvitation);

  const RFQs = RFQsData?.data;
  const invitations = invitationsData?.data;

  const dataToDisplay = isInvitation ? invitations : RFQs;
  const isLoading = isInvitation ? isinvitationsLoading : isRFQsLoading;

  const filteredRFQs =
    activeFilter === 0
      ? dataToDisplay
      : dataToDisplay?.filter((rfq: RFQsType) =>
          isInvitation
            ? rfq.invitable?.status === activeFilter
            : rfq.status === activeFilter
        );
  return (
    <div className="min-h-screen bg-gray-50 p-8" data-testid="rfqs-template">
      <div className="container">
        <Text className="text-2xl font-bold text-center mb-2" testId="title">
          {isInvitation ? t("rfqs.invitations_title") : t("rfqs.rfqs_title")}
        </Text>
        <Text testId="desc" className="text-gray-500 text-center mb-6">
          All the Lorem Ipsum generators on the Internet tend to repeat.
        </Text>
        <div
          className="flex justify-center gap-4 mb-6"
          data-testid="status-filters"
        >
          {RFP_STATUS.map((status) => (
            <button
              key={status.value}
              className={`px-4 py-2 rounded-full font-medium ${
                activeFilter === status.value
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveFilter(status.value)}
              data-testid={`filter-${status.value}`}
            >
              {status.label}
            </button>
          ))}
        </div>
        {isLoading ? (
          <div data-testid="loader-container">
            <Loader />
          </div>
        ) : (
          <div data-testid="rfqs-container">
            <RFQsGrid
              isLoading={isLoading}
              filteredRFQs={filteredRFQs}
              isInvitation={isInvitation}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RFQsTemplate;
