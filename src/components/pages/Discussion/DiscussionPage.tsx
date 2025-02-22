import DiscussionTemplate from "@/components/templates/Discussion/DiscussionTemplate";
import React from "react";

export default async function DiscussionPage({ rfqId }: { rfqId: string }) {
  return <DiscussionTemplate rfqId={rfqId} />;
}
