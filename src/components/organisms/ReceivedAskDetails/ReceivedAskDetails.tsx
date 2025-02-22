import Text from "@/components/atoms/Text/Text";
import { useLanguage } from "@/hooks/useLanguage";
import { findLabelByValue, formatDate } from "@/utils/generalUtils";
import React, { FC, useCallback, useState } from "react";
import { BiTime } from "react-icons/bi";
import { FaAudioDescription, FaServicestack, FaFile } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { file_types } from "@/constants/constants";
import { t } from "i18next";
import Button from "@/components/atoms/Button/Button";
import Link from "next/link";
import { ReceivedAsk } from "@/types/Ask";
import ReplyReceivedAskModal from "../Modals/ReplyReceivedAskModal/ReplyReceivedAskModal";

interface ReceivedAskDetailsProps {
  receivedAsk: ReceivedAsk;
}

const ReceivedAskDetails: FC<ReceivedAskDetailsProps> = ({ receivedAsk }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { formattedDate, formattedTime } = formatDate(receivedAsk.created_at);

  const lang = useLanguage();

  const toggleReplyModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <div
      className="relative bg-white shadow-md rounded-lg p-6"
      data-testid="invitation-details"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <MdSubject className="text-orange-500 text-xl mt-1" />
          <div>
            <Text
              testId="ask-subject-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("received_ask.subject")}
            </Text>
            <Text testId="ask-subject-value" className="text-gray-600">
              {receivedAsk.invitable.title}
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
              {t("received_ask.description")}
            </Text>
            <Text testId="ask-description-value" className="text-gray-600">
              {receivedAsk.invitable.content}
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
              {t("received_ask.service")}
            </Text>
            <Text testId="ask-service-value" className="text-gray-600">
              {receivedAsk.invitable.service[`name_${lang}`] ||
                receivedAsk.invitable.service.name_en}
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
              {t("received_ask.created_at")}
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
              testId="rfq-files-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("received_ask.files")}
            </Text>
            {receivedAsk.invitable.files &&
            receivedAsk.invitable.files.length > 0 ? (
              <div className="space-y-2">
                {receivedAsk.invitable.files.map((file) => (
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
                {t("received_ask.no_files_available")}
              </Text>
            )}
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-7">
          <div className="w-full md:w-1/3">
            <Button
              variant="main"
              dataTestid="reply-button"
              onClick={toggleReplyModal}
            >
              {t("received_ask.reply")}
            </Button>
          </div>
          <Link
            href={`/discussion/${receivedAsk.invitable_id}?receiverId=${receivedAsk.invitable.user.id}&isrfq=false&type=invitation`}
            className="w-full md:w-1/3"
          >
            <Button variant="outlineMain" dataTestid="discuss">
              {t("received_ask.discuss")}
            </Button>
          </Link>
        </div>
      </div>
      <ReplyReceivedAskModal
        invitableId={receivedAsk.invitable_id}
        isOpen={isModalOpen}
        onCancel={toggleReplyModal}
      />
    </div>
  );
};

export default ReceivedAskDetails;
