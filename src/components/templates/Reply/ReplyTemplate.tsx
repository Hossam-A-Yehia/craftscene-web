"use client";
import React from "react";
import Container from "@/components/atoms/Container/Container";
import Text from "@/components/atoms/Text/Text";
import { t } from "i18next";
import { useFetchUser } from "@/hooks/useUser";
import { useFetchQuotations } from "@/hooks/useRfqs";
import { useQuery } from "@/hooks/useQuery";
import { QuotationsType } from "@/types/RFQs";
import Avatar from "@/components/atoms/Avatar/Avatar";
import { findLabelByValue, formatDate } from "@/utils/generalUtils";
import { file_types } from "@/constants/constants";
import Button from "@/components/atoms/Button/Button";
import Link from "next/link";
import Loader from "@/components/atoms/Loader/Loader";

type ReplyTemplateProps = {
  replyId: string;
};

const ReplyTemplate: React.FC<ReplyTemplateProps> = ({ replyId }) => {
  const { data: userData } = useFetchUser();
  const { askId } = useQuery();

  const { data: quotations, isLoading } = useFetchQuotations({
    discussionable_id: String(askId),
    user_id: userData?.id,
    discussionable_type: 2,
  });

  const quotation = quotations?.find(
    (quotation: QuotationsType) => quotation.id !== replyId
  );

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
            {t("reply_details.reply_details")}
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
              <Button variant="main">{t("reply_details.view_profile")}</Button>
            </Link>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <Text className="text-lg font-semibold text-gray-700 mb-2">
                {t("reply_details.reply_details")}
              </Text>
            </div>
            <Text className="text-gray-600">{quotation.details}</Text>
          </div>
          <div>
            <Text
              testId="rfq-files-label"
              className="font-semibold text-gray-700 mb-1"
            >
              {t("reply_details.files")}
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
                {t("reply_details.no_files_available")}
              </Text>
            )}
          </div>
          <div className=" space-x-4 mt-5 w">
            <Link
              href={`/discussion/${askId}?receiverId=${quotation.user?.id}&isrfq=true&type=rfq`}
              className="w-full md:w-1/3"
            >
              <Button variant="outlineMain" dataTestid="discuss">
                {t("reply_details.discuss")}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ReplyTemplate;
