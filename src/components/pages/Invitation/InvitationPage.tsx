import InvitationTemplate from "@/components/templates/Invitation/InvitationTemplate";
import React from "react";

export default async function InvitationPage({
  invitationId,
}: {
  invitationId: string;
}) {
  return <InvitationTemplate invitationId={invitationId} />;
}
