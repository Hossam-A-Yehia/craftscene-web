import Button from "@/components/atoms/Button/Button";
import CustomImage from "@/components/atoms/Image/CustomImage";
import NavLink from "@/components/atoms/NavLink/NavLink";
import Text from "@/components/atoms/Text/Text";
import { RFQStatus, UserStatus } from "@/constants/enums/rfqsEnum";
import {
  useMutateAcceptQuotation,
  useMutateDeclineQuotation,
} from "@/hooks/useRfqs";
import { QuotationsType } from "@/types/RFQs";
import { formatDate } from "@/utils/generalUtils";
import { useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { toast } from "react-toastify";

interface QuotationsCardProps {
  quotation: QuotationsType;
}

interface QuotationActionData {
  rfp_id: number;
  user_id: number;
}

interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}

const QuotationsCard: React.FC<QuotationsCardProps> = ({ quotation }) => {
  const queryClient = useQueryClient();

  const { formattedDate, formattedTime } = formatDate(quotation.created_at);
  const rfqStatus = quotation?.discussionable?.status;
  const notifiableUsers = quotation?.discussionable?.notifiable_users;
  const userStatus = notifiableUsers?.find(
    (user) => user.user_id === String(quotation?.user_id)
  )?.status;

  const isButtonDisabled =
    [
      UserStatus.ACCEPTED,
      UserStatus.DECLINED,
      UserStatus.ACCEPTED_FOR_ANOTHER_USER,
    ].includes(userStatus!) ||
    rfqStatus === RFQStatus.CLOSED ||
    rfqStatus === RFQStatus.ACCEPTED;

  const { mutateAsync: mutateAccept, isPending: isLoadingAccept } =
    useMutateAcceptQuotation();
  const { mutateAsync: mutateDecline, isPending: isLoadingDecline } =
    useMutateDeclineQuotation();

  const rfp_id = quotation?.discussionable.id;

  const handleQuotationAction = async (
    user_id: number,
    action: (data: QuotationActionData) => Promise<void>,
    successMessage: string
  ): Promise<void> => {
    const structuredData: QuotationActionData = {
      rfp_id,
      user_id,
    };

    try {
      await action(structuredData);
      queryClient.invalidateQueries({ queryKey: ["Quotations"] });
      toast.info(successMessage);
    } catch (err) {
      const error = err as ApiError;
      toast.error(error.response.data.message);
    }
  };

  const handleAcceptQuotation = (user_id: number) =>
    handleQuotationAction(
      user_id,
      mutateAccept,
      t("rfq_details.accept_quotation")
    );

  const handleDeclineQuotation = (user_id: number) =>
    handleQuotationAction(
      user_id,
      mutateDecline,
      t("rfq_details.decline_quotation")
    );

  const getUserStatusMessage = (): React.ReactNode => {
    switch (userStatus) {
      case UserStatus.ACCEPTED:
        return (
          <Text
            testId="status-message"
            className="font-semibold text-green-500 text-md"
          >
            {t("rfq_details.accept_messgae")}
          </Text>
        );
      case UserStatus.DECLINED:
        return (
          <Text className="font-semibold text-red-600 text-md">
            {t("rfq_details.decline_messgae")}
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 rounded-full relative">
          <CustomImage
            src={quotation.user.business_user_detail.logo}
            alt={quotation.user.business_user_detail.business_name}
            fill
            testId="business-logo"
          />
        </div>
        <div>
          <div className="flex gap-3 items-center">
            <Text
              className="font-semibold text-gray-900 text-lg"
              testId="business-name"
            >
              {quotation.user.business_user_detail.business_name}
            </Text>
            {getUserStatusMessage()}
          </div>
          <Text className="text-gray-500 text-sm" testId="budget">
            $ {quotation.budget}
          </Text>
          <Text className="text-gray-500 text-sm" testId="date-time">
            {formattedDate} at {formattedTime}
          </Text>
          <div data-testid="view-details">
            <NavLink
              href={`/quotations/${quotation.id}?rfqId=${quotation.discussionable.id}`}
              data-testid="view-details"
            >
              {t("rfq_details.view_details")}
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <FaRegCommentDots
          className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700"
          data-testid="comment-icon"
        />
        <div className="flex flex-col items-end space-y-2">
          <Button
            disabled={isButtonDisabled || isLoadingAccept}
            variant="main"
            onClick={() => handleAcceptQuotation(Number(quotation.user_id))}
            dataTestid="accept-button"
          >
            {t("rfq_details.accept_btn")}
          </Button>
          <Button
            disabled={isButtonDisabled || isLoadingDecline}
            variant="outlineMain"
            onClick={() => handleDeclineQuotation(Number(quotation.user_id))}
            dataTestid="decline-button"
          >
            {t("rfq_details.decline_btn")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuotationsCard;
