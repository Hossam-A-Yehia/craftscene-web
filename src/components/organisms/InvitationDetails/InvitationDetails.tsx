import Text from "@/components/atoms/Text/Text";
import { useLanguage } from "@/hooks/useLanguage";
import { findLabelByValue, formatDate } from "@/utils/generalUtils";
import React, { FC, useCallback, useState } from "react";
import { BiTime } from "react-icons/bi";
import { FaAudioDescription, FaServicestack, FaFile } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import {
  BusinessUserInvitaionStatus,
  file_types,
  InvitationStatusEnum,
  RFPStatusEnum,
} from "@/constants/constants";
import { t } from "i18next";
import { Invitation } from "@/types/Invitations";
import Button from "@/components/atoms/Button/Button";
import Link from "next/link";
import { useMutateDeclineQuotation } from "@/hooks/useRfqs";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { RFQStatus, UserStatus } from "@/constants/enums/rfqsEnum";
import ReplyInvitationModal from "../Modals/ReplyInvitationModal/ReplyInvitationModal";

interface InvitationDetailsProps {
  invitation: Invitation;
}

const statusLabels: Record<InvitationStatusEnum, { color: string }> = {
  [InvitationStatusEnum.PENDING]: { color: "bg-gray-100 text-gray-600" },
  [InvitationStatusEnum.IN_PROGRESS]: {
    color: "bg-orange-100 text-orange-600",
  },
  [InvitationStatusEnum.COMPLETED]: { color: "bg-green-100 text-green-600" },
  [InvitationStatusEnum.DECLINE]: { color: "bg-red-100 text-red-600" },
  [InvitationStatusEnum.ACCEPTED_FOR_ANOTHER_USER]: {
    color: "bg-blue-100",
  },
};

const InvitationDetails: FC<InvitationDetailsProps> = ({ invitation }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { formattedDate, formattedTime } = formatDate(invitation.created_at);
  const { mutateAsync: mutateDecline } = useMutateDeclineQuotation();

  const lang = useLanguage();
  const rfqStatus = invitation.invitable?.status;
  const notifiableUsers = invitation.invitable?.notifiable_users;
  const userStatus = notifiableUsers?.find(
    (user: { user_id: string }) => user.user_id === String(invitation?.user_id)
  )?.status;

  const isButtonDisabled =
    [
      UserStatus.IN_PROGRESS,
      UserStatus.ACCEPTED,
      UserStatus.DECLINED,
      UserStatus.ACCEPTED_FOR_ANOTHER_USER,
    ].includes(userStatus!) ||
    rfqStatus === RFQStatus.CLOSED ||
    rfqStatus === RFQStatus.ACCEPTED;

  const handleDecline = async (userId: number) => {
    const structuredData = {
      rfp_id: invitation.invitable_id,
      user_id: userId,
    };
    try {
      await mutateDecline(structuredData);
      queryClient.invalidateQueries({ queryKey: ["RFPs"] });
      toast.info(t("invitation_details.decline_messgae"));
    } catch (err: any) {
      toast.error(err.response.data.message);
      return err;
    }
  };
  const toggleReplyModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);
  return (
    <div
      className="relative bg-white shadow-md rounded-lg p-6"
      data-testid="invitation-details"
    >
      <div className="flex items-center justify-between mb-6 absolute right-4">
        <div
          data-testid="rfq-status-label"
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            statusLabels[userStatus as RFPStatusEnum]?.color ||
            "bg-gray-100 text-gray-600"
          }`}
        >
          {findLabelByValue(userStatus as any, BusinessUserInvitaionStatus)}
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
              {invitation.invitable?.subject}
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
              {invitation.invitable?.description}
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
              {t("rfq_details.service")}
            </Text>
            <Text testId="rfq-service-value" className="text-gray-600">
              {invitation.invitable?.service[`name_${lang}`] ||
                invitation.invitable?.service.name_en}
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
            {invitation.invitable?.files &&
            invitation.invitable?.files.length > 0 ? (
              <div className="space-y-2">
                {invitation.invitable?.files.map((file) => (
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
        <div className="flex justify-end space-x-4 mt-7">
          <Link
            href={`/discussion/${invitation.invitable_id}?receiverId=${invitation.invitable?.user.id}&isrfq=true&type=invitation`}
            className="w-full md:w-1/3"
          >
            <Button variant="outlineMain" dataTestid="discuss">
              {t("quotation_details.discuss")}
            </Button>
          </Link>
          <div className="w-full md:w-1/3">
            <Button
              disabled={isButtonDisabled}
              variant="main"
              dataTestid="reply-button"
              onClick={toggleReplyModal}
            >
              {t("invitation_details.reply")}
            </Button>
          </div>
          <div className="w-full md:w-1/3">
            <Button
              disabled={isButtonDisabled}
              variant="outlineMain"
              onClick={() => handleDecline(invitation.invitable.user.id)}
              dataTestid="decline-button"
            >
              {t("rfq_details.decline_btn")}
            </Button>
          </div>
        </div>
      </div>
      <ReplyInvitationModal
        invitableId={invitation.invitable_id}
        isOpen={isModalOpen}
        onCancel={toggleReplyModal}
      />
    </div>
  );
};

export default InvitationDetails;
