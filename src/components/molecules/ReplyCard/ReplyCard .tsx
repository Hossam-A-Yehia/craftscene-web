import CustomImage from "@/components/atoms/Image/CustomImage";
import NavLink from "@/components/atoms/NavLink/NavLink";
import Text from "@/components/atoms/Text/Text";
import { QuotationsType } from "@/types/RFQs";
import { formatDate } from "@/utils/generalUtils";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaRegCommentDots } from "react-icons/fa";

interface ReplyCardProps {
  reply: QuotationsType;
}

const ReplyCard: React.FC<ReplyCardProps> = ({ reply }) => {
  const { formattedDate, formattedTime } = formatDate(reply.created_at);
  const { t } = useTranslation();
  return (
    <div
      className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between"
      data-testid="reply-card"
    >
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 rounded-full relative">
          <CustomImage
            src={reply.user.business_user_detail.logo}
            alt={reply.user.business_user_detail.business_name}
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
              {reply.user.business_user_detail.business_name}
            </Text>
          </div>
          <Text className="text-gray-500 text-sm" testId="date-time">
            {formattedDate} at {formattedTime}
          </Text>
          <div data-testid="view-details">
            <NavLink
              href={`/replies/${reply.id}?askId=${reply.discussionable_id}`}
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
      </div>
    </div>
  );
};

export default ReplyCard;
