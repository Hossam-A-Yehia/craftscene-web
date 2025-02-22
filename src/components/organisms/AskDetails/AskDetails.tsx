import Text from "@/components/atoms/Text/Text";
import { useLanguage } from "@/hooks/useLanguage";
import { findLabelByValue, formatDate } from "@/utils/generalUtils";
import React, { FC } from "react";
import { BiCategory, BiTime } from "react-icons/bi";
import { FaAudioDescription, FaServicestack, FaFile } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { file_types } from "@/constants/constants";
import { t } from "i18next";
import { Ask } from "@/types/Ask";

interface AskDetailsProps {
  ask: Ask;
}

const AskDetails: FC<AskDetailsProps> = ({ ask }) => {
  const { formattedDate, formattedTime } = formatDate(ask.created_at);
  const lang = useLanguage();

  return (
    <div className="relative bg-white shadow-md rounded-lg p-6">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <MdSubject className="text-orange-500 text-xl mt-1" />
          <div>
            <Text
              testId="ask-subject-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("ask_details.ask_title")}
            </Text>
            <Text testId="ask-subject-value" className="text-gray-600">
              {ask.title}
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FaAudioDescription className="text-orange-500 text-2xl mt-1" />
          <div>
            <Text
              testId="ask-description-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("ask_details.description")}
            </Text>
            <Text testId="ask-description-value" className="text-gray-600">
              {ask.content}
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <BiCategory className="text-orange-500 text-xl mt-1" />
          <div>
            <Text
              testId="ask-category-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("ask_details.category")}
            </Text>
            <Text testId="ask-category-value" className="text-gray-600">
              {ask.service.category[`name_${lang}`] ||
                ask.service.category.name_en}
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FaServicestack className="text-orange-500 text-xl mt-1" />
          <div>
            <Text
              testId="ask-service-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("ask_details.service")}
            </Text>
            <Text testId="ask-service-value" className="text-gray-600">
              {ask.service[`name_${lang}`] || ask.service.name_en}
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <BiTime className="text-orange-500 text-xl mt-1" />
          <div>
            <Text
              testId="ask-created-at-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("ask_details.created_at")}
            </Text>
            <Text testId="ask-created-at-value" className="text-gray-600">
              {formattedDate} <sup>{formattedTime}</sup>
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <FaFile className="text-orange-500 text-xl mt-1" />
          <div>
            <Text
              testId="ask-files-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("ask_details.files")}
            </Text>
            {ask.files && ask.files.length > 0 ? (
              <div className="space-y-2">
                {ask.files.map((file) => (
                  <div key={file.id} className="flex items-center gap-2">
                    <Text
                      testId={`ask-file-${file.id}`}
                      className="text-gray-600"
                    >
                      <a
                        data-testid={`ask-file-link-${file.id}`}
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
              <Text testId="ask-no-files" className="text-gray-600">
                {t("ask_details.no_files_available")}
              </Text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskDetails;
