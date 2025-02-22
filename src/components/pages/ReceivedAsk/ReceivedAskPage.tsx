import ReceivedAskTemplate from "@/components/templates/ReceivedAsk/ReceivedAskTemplate";
import React from "react";

export default async function ReceivedAskPage({
  receivedAskId,
}: {
  receivedAskId: string;
}) {
  return <ReceivedAskTemplate receivedAskId={receivedAskId} />;
}
