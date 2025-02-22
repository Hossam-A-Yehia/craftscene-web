import ReceivedAskPage from "@/components/pages/ReceivedAsk/ReceivedAskPage";
import { receivedask } from "@/config/metadata";
import React from "react";
export const metadata = receivedask;
export default async function Page({
  params,
}: {
  params: Promise<{ receivedAskId: string }>;
}) {
  const receivedAskId = (await params).receivedAskId;
  return <ReceivedAskPage receivedAskId={receivedAskId} />;
}
