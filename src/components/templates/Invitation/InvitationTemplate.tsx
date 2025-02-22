"use client";
import React, { FC } from "react";
import { useFetchMyInvitations } from "@/hooks/useRfqs";
import Loader from "@/components/atoms/Loader/Loader";
import { t } from "i18next";
import InvitationDetails from "@/components/organisms/InvitationDetails/InvitationDetails";
import { Invitation } from "@/types/Invitations";
import Text from "@/components/atoms/Text/Text";

interface InvitationTemplateProps {
  invitationId: string;
}
const InvitationTemplate: FC<InvitationTemplateProps> = ({ invitationId }) => {
  const { data: invitationData, isLoading } = useFetchMyInvitations(
    invitationId,
    true
  );
  const invitation: Invitation = invitationData?.data[0];
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-[#F6F7FC]">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {t("invitation_details.invitation_details")}
          </Text>
          <p className="text-gray-600">
            All the Lorem Ipsum generators on the Internet tend to repeat.
          </p>
        </div>
        <div>
          <InvitationDetails invitation={invitation} />
        </div>
      </div>
    </div>
  );
};

export default InvitationTemplate;
