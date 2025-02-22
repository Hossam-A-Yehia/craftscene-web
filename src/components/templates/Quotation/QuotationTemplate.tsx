"use client";
import React from "react";
import Container from "@/components/atoms/Container/Container";
import Text from "@/components/atoms/Text/Text";
import { t } from "i18next";
import {
  useFetchQuotations,
  useMutateAcceptQuotation,
  useMutateDeclineQuotation,
} from "@/hooks/useRfqs";
import { useQuery } from "@/hooks/useQuery";
import { QuotationsType } from "@/types/RFQs";
import Avatar from "@/components/atoms/Avatar/Avatar";
import { findLabelByValue, formatDate } from "@/utils/generalUtils";
import { file_types, RFP_STATUS } from "@/constants/constants";
import Button from "@/components/atoms/Button/Button";
import Link from "next/link";
import Loader from "@/components/atoms/Loader/Loader";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { RFQStatus, UserStatus } from "@/constants/enums/rfqsEnum";
import { useUser } from "@/context/UserContext";

type QuotationTemplateProps = {
  quotationId: string;
};

interface QuotationActionData {
  rfp_id: number;
  user_id: number;
}

const QuotationTemplate: React.FC<QuotationTemplateProps> = ({
  quotationId,
}) => {
  const { userData } = useUser();
  const { rfqId } = useQuery();
  const queryClient = useQueryClient();

  const { data: quotations, isLoading } = useFetchQuotations({
    discussionable_id: String(rfqId),
    user_id: userData?.id ?? 0,
    discussionable_type: 1,
  });

  const quotation = quotations?.find(
    (quotation: QuotationsType) => quotation.id !== quotationId
  );

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
    const structuredData: QuotationActionData = { rfp_id, user_id };

    try {
      await action(structuredData);
      queryClient.invalidateQueries({ queryKey: ["Quotations"] });
      toast.info(successMessage);
    } catch (err) {
      const error = err as any;
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

  const rfqStatus = quotation?.discussionable?.status;
  const notifiableUsers = quotation?.discussionable?.notifiable_users;
  const userStatus = notifiableUsers?.find(
    (user: { user_id: string }) => user.user_id === String(quotation?.user_id)
  )?.status;

  const isButtonDisabled =
    [
      UserStatus.ACCEPTED,
      UserStatus.DECLINED,
      UserStatus.ACCEPTED_FOR_ANOTHER_USER,
    ].includes(userStatus!) ||
    rfqStatus === RFQStatus.CLOSED ||
    rfqStatus === RFQStatus.ACCEPTED;

  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        data-testid="loader"
      >
        <Loader />
      </div>
    );
  }

  const { formattedDate, formattedTime } = formatDate(quotation?.created_at);

  return (
    <div className="min-h-screen bg-gray-50 py-5 px-4">
      <Container>
        <div className="text-center mb-8 mt-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {t("quotation_details.quotation_details")}
          </h1>
          <p className="text-gray-600">
            All the Lorem Ipsum generators on the Internet tend to repeat.
          </p>
        </div>
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <div className="flex items-center justify-between py-4 rounded-lg border-b mb-6">
            <div className="flex items-center">
              <Avatar
                src={quotation.user.business_user_detail.logo}
                alt={quotation.user.username}
              />
              <div className="mx-3">
                <Text className="text-lg font-semibold text-gray-700">
                  {quotation.user.username}
                </Text>
                <Text className="text-gray-500 text-sm" testId="date-time">
                  {formattedDate} at {formattedTime}
                </Text>
              </div>
            </div>
            <Link href={`/business-user/${quotation.user.id}`}>
              <Button variant="main">
                {t("quotation_details.view_profile")}
              </Button>
            </Link>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <Text className="text-lg font-semibold text-gray-700 mb-2">
                {t("quotation_details.quotation_details")}
              </Text>
              <div
                data-testid="rfq-status-label"
                className={`px-4 py-2 rounded-full text-md font-semibold`}
              >
                {findLabelByValue(userStatus, RFP_STATUS)}
              </div>
            </div>
            <Text className="text-gray-600">{quotation.details}</Text>
          </div>
          <div className="mb-6">
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              {t("quotation_details.budget_details")}
            </Text>
            <Text className="text-gray-600">{quotation.budget} $</Text>
          </div>
          <div>
            <Text
              testId="rfq-files-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("rfq_details.files")}
            </Text>
            {quotation.files && quotation.files.length > 0 ? (
              <div className="space-y-2">
                {quotation.files.map((file: any) => (
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
          <div className="flex justify-end space-x-4 mt-5">
            <Link
              href={`/discussion/${rfp_id}?receiverId=${quotation.user?.id}&isrfq=true&type=rfq`}
              className="w-full md:w-1/3"
            >
              <Button variant="outlineMain" dataTestid="discuss">
                {t("quotation_details.discuss")}
              </Button>
            </Link>
            <div className="w-full md:w-1/3">
              <Button
                disabled={isButtonDisabled || isLoadingAccept}
                variant="main"
                onClick={() => handleAcceptQuotation(Number(quotation.user_id))}
                dataTestid="accept-button"
              >
                {t("rfq_details.accept_btn")}
              </Button>
            </div>
            <div className="w-full md:w-1/3">
              <Button
                disabled={isButtonDisabled || isLoadingDecline}
                variant="outlineMain"
                onClick={() =>
                  handleDeclineQuotation(Number(quotation.user_id))
                }
                dataTestid="decline-button"
              >
                {t("rfq_details.decline_btn")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default QuotationTemplate;
