import Text from "@/components/atoms/Text/Text";
import { RFP_STATUS } from "@/constants/constants";
import { findLabelByValue, formatDate } from "@/utils/generalUtils";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";

const RFQsCard = ({
  id,
  status,
  subject,
  createdAt,
  isInvitation,
  service,
  category,
}: {
  id: number;
  status: number;
  subject: string;
  createdAt: string;
  isInvitation?: boolean;
  service?: string;
  category?: string;
}) => {
  const statusColor: { [key: string]: string } = {
    1: "text-orange-500",
    4: "text-green-500",
    3: "text-red-500",
    2: "text-blue-500",
  };
  const statusLabel = findLabelByValue(status, RFP_STATUS);
  const { formattedDate, formattedTime } = formatDate(createdAt);
const { t } = useTranslation();
  return (
    <div
      className="border rounded-lg p-4 shadow-sm bg-white mb-4 flex flex-col gap-4"
      data-testid="rfq-card"
    >
      <div className="flex items-center justify-between w-full">
        <Text className="text-gray-500 text-lg">{t("rfqs.subject")}:</Text>
        <Text className="text-lg font-semibold" testId="rfqs-subject">
          {subject}
        </Text>
      </div>
      {category && (
        <div className="flex items-center justify-between w-full">
          <Text className="text-gray-500 text-lg">{t("rfqs.category")}:</Text>
          <Text className="text-lg font-semibold" testId="rfqs-category">
            {category}
          </Text>
        </div>
      )}
      <div className="flex items-center justify-between w-full">
        <Text className="text-gray-500 text-lg">{t("rfqs.service")}:</Text>
        <Text className="text-lg font-semibold" testId="rfqs-Service">
          {service}
        </Text>
      </div>
      <div className="flex items-center justify-between w-full">
        <Text className="text-gray-500 text-lg">
          {t("rfqs.creation_date")}:
        </Text>
        <Text className="text-lg font-semibold" testId="creation-date">
          {formattedDate} <sup>{formattedTime}</sup>
        </Text>
      </div>
      <div className="flex items-center justify-between w-full">
        <Text className="text-gray-500 text-lg">{t("rfqs.status")}:</Text>
        <Text
          className={`text-lg font-semibold ${statusColor[status]} capitalize`}
          testId="rfqs-status"
        >
          {statusLabel}
        </Text>
      </div>
      <Link
        href={isInvitation ? `/invitations/${id}` : `/rfqs/${id}`}
        className="mt-4 text-orange-500 font-medium flex items-center gap-1"
      >
        {t("rfqs.view_details")}
        <FiArrowRight data-testid="arrow-icon" />
      </Link>
    </div>
  );
};

export default RFQsCard;
