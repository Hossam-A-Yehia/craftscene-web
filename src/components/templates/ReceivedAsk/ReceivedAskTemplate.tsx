"use client";
import React, { FC } from "react";
import Loader from "@/components/atoms/Loader/Loader";
import { t } from "i18next";
import Text from "@/components/atoms/Text/Text";
import { useFetchReceivedAsks } from "@/hooks/useAsks";
import ReceivedAskDetails from "@/components/organisms/ReceivedAskDetails/ReceivedAskDetails";
import { ReceivedAsk } from "@/types/Ask";

interface ReceivedAskTemplateProps {
  receivedAskId: string;
}
const ReceivedAskTemplate: FC<ReceivedAskTemplateProps> = ({
  receivedAskId,
}) => {
  const { data: receivedAskData, isLoading } = useFetchReceivedAsks(
    receivedAskId,
    true
  );
  const receivedAsk: ReceivedAsk = receivedAskData?.data[0];

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-[#F6F7FC]">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {t("received_ask.title")}
          </Text>
          <p className="text-gray-600">
            All the Lorem Ipsum generators on the Internet tend to repeat.
          </p>
        </div>
        <div>
          <ReceivedAskDetails receivedAsk={receivedAsk} />
        </div>
      </div>
    </div>
  );
};

export default ReceivedAskTemplate;
