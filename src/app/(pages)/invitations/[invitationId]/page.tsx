import InvitationPage from "@/components/pages/Invitation/InvitationPage";
import { invitations } from "@/config/metadata";
import React from "react";
export const metadata = invitations;
export default async function Page({
  params,
}: {
  params: Promise<{ invitationId: string }>;
}) {
  const invitationId = (await params).invitationId;
  return <InvitationPage invitationId={invitationId} />;
}
