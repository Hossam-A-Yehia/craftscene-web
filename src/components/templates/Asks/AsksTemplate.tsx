"use client";
import Loader from "@/components/atoms/Loader/Loader";
import Text from "@/components/atoms/Text/Text";
import AsksGrid from "@/components/organisms/AsksGrid/AsksGrid";
import { useFetchMyAsks, useFetchReceivedAsks } from "@/hooks/useAsks";
import { t } from "i18next";
import React from "react";

const AsksTemplate = ({ isInvitation }: { isInvitation: boolean }) => {
  const { data: asksData, isLoading: isAsksLoading } = useFetchMyAsks(
    null,
    !isInvitation
  );
  const { data: receivedAsksData, isLoading: isReceivedAsksLoading } =
    useFetchReceivedAsks(null, isInvitation);

  const asks = asksData?.data;
  const invitations = receivedAsksData?.data;

  const dataToDisplay = isInvitation ? invitations : asks;
  const isLoading = isInvitation ? isReceivedAsksLoading : isAsksLoading;

  return (
    <div className="min-h-screen bg-gray-50 p-8" data-testid="asks-template">
      <div className="container">
        <Text className="text-2xl font-bold text-center mb-2" testId="title">
          {isInvitation ? t("asks.title_received_asks") : t("asks.title_asks")}
        </Text>
        <Text testId="desc" className="text-gray-500 text-center mb-6">
          All the Lorem Ipsum generators on the Internet tend to repeat.
        </Text>
        <div
          className="flex justify-center gap-4 mb-6"
          data-testid="status-filters"
        ></div>
        {isLoading ? (
          <div data-testid="loader-container">
            <Loader />
          </div>
        ) : (
          <div data-testid="asks-container">
            <AsksGrid
              isLoading={isLoading}
              data={dataToDisplay}
              isInvitation={isInvitation}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AsksTemplate;
