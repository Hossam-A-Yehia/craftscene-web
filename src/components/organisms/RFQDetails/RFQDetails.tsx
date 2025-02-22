import Text from "@/components/atoms/Text/Text";
import { useLanguage } from "@/hooks/useLanguage";
import { RFQsType } from "@/types/RFQs";
import { findLabelByValue, formatDate } from "@/utils/generalUtils";
import React, { FC } from "react";
import { BiCategory, BiTime } from "react-icons/bi";
import { FaAudioDescription, FaServicestack, FaFile } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { file_types, RFP_STATUS, RFPStatusEnum } from "@/constants/constants";
import { t } from "i18next";

interface RFQDetailsProps {
  rfq: RFQsType;
}

const statusLabels: Record<RFPStatusEnum, { color: string }> = {
  [RFPStatusEnum.Pending]: { color: "bg-gray-100 text-gray-600" },
  [RFPStatusEnum.InProgress]: { color: "bg-orange-100 text-orange-600" },
  [RFPStatusEnum.Completed]: { color: "bg-green-100 text-green-600" },
  [RFPStatusEnum.Declined]: { color: "bg-red-100 text-red-600" },
};

const RFQDetails: FC<RFQDetailsProps> = ({ rfq }) => {
  const { formattedDate, formattedTime } = formatDate(rfq.created_at);
  const lang = useLanguage();

  return (
    <div className="relative bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-6 absolute right-4">
        <div
          data-testid="rfq-status-label"
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            statusLabels[rfq.status as RFPStatusEnum]?.color ||
            "bg-gray-100 text-gray-600"
          }`}
        >
          {findLabelByValue(rfq.status, RFP_STATUS)}
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <MdSubject className="text-orange-500 text-xl mt-1" />
          <div>
            <Text
              testId="rfq-subject-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("rfq_details.subject")}
            </Text>
            <Text testId="rfq-subject-value" className="text-gray-600">
              {rfq.subject}
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FaAudioDescription className="text-orange-500 text-2xl mt-1" />
          <div>
            <Text
              testId="rfq-description-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("rfq_details.description")}
            </Text>
            <Text testId="rfq-description-value" className="text-gray-600">
              {rfq.description}
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <BiCategory className="text-orange-500 text-xl mt-1" />
          <div>
            <Text
              testId="rfq-category-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("rfq_details.category")}
            </Text>
            <Text testId="rfq-category-value" className="text-gray-600">
              {rfq.service.category[`name_${lang}`] ||
                rfq.service.category.name_en}
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FaServicestack className="text-orange-500 text-xl mt-1" />
          <div>
            <Text
              testId="rfq-service-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("rfq_details.description")}
            </Text>
            <Text testId="rfq-service-value" className="text-gray-600">
              {rfq.service[`name_${lang}`] || rfq.service.name_en}
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <BiTime className="text-orange-500 text-xl mt-1" />
          <div>
            <Text
              testId="rfq-created-at-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("rfq_details.created_at")}
            </Text>
            <Text testId="rfq-created-at-value" className="text-gray-600">
              {formattedDate} <sup>{formattedTime}</sup>
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FaFile className="text-orange-500 text-xl mt-1" />
          <div>
            <Text
              testId="rfq-files-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("rfq_details.files")}
            </Text>
            {rfq.files && rfq.files.length > 0 ? (
              <div className="space-y-2">
                {rfq.files.map((file) => (
                  <div key={file.id} className="flex items-center gap-2">
                    <Text
                      testId={`rfq-file-${file.id}`}
                      className="text-gray-600"
                    >
                      <a
                        data-testid={`rfq-file-link-${file.id}`}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {findLabelByValue(file.type, file_types)} - {file.id}
                      </a>
                    </Text>
                  </div>
                ))}
              </div>
            ) : (
              <Text testId="rfq-no-files" className="text-gray-600">
                {t("rfq_details.no_files_available")}
              </Text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQDetails;
