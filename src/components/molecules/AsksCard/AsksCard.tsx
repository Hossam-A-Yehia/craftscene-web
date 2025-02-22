import Text from "@/components/atoms/Text/Text";
import { formatDate } from "@/utils/generalUtils";
import { t } from "i18next";
import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const AsksCard = ({
  id,
  title,
  createdAt,
  isInvitation,
  service,
  category,
  username,
}: {
  id: number;
  title: string;
  createdAt: string;
  isInvitation?: boolean;
  service?: string;
  category?: string;
  username?: string;
}) => {
  const { formattedDate, formattedTime } = formatDate(createdAt);

  return (
    <div
      className="border rounded-lg p-4 shadow-sm bg-white mb-4 flex flex-col gap-4"
      data-testid="ask-card"
    >
      <div className="flex items-center justify-between w-full">
        <Text className="text-gray-500 text-lg">{t("asks.title")}:</Text>
        <Text className="text-lg font-semibold" testId="asks-title">
          {title}
        </Text>
      </div>
      {category && (
        <div className="flex items-center justify-between w-full">
          <Text className="text-gray-500 text-lg">{t("asks.category")}:</Text>
          <Text className="text-lg font-semibold" testId="asks-category">
            {category}
          </Text>
        </div>
      )}
      <div className="flex items-center justify-between w-full">
        <Text className="text-gray-500 text-lg">{t("asks.service")}:</Text>
        <Text className="text-lg font-semibold" testId="asks-Service">
          {service}
        </Text>
      </div>
      {isInvitation && (
        <div className="flex items-center justify-between w-full">
          <Text className="text-gray-500 text-lg">{t("asks.username")}:</Text>
          <Text className="text-lg font-semibold" testId="asks-username">
            {username}
          </Text>
        </div>
      )}
      <div className="flex items-center justify-between w-full">
        <Text className="text-gray-500 text-lg">
          {t("asks.creation_date")}:
        </Text>
        <Text className="text-lg font-semibold" testId="creation-date">
          {formattedDate} <sup>{formattedTime}</sup>
        </Text>
      </div>
      <Link
        href={isInvitation ? `/received-asks/${id}` : `/asks/${id}`}
        className="mt-4 text-orange-500 font-medium flex items-center gap-1"
      >
        {t("asks.view_details")}
        <FiArrowRight data-testid="arrow-icon" />
      </Link>
    </div>
  );
};

export default AsksCard;
