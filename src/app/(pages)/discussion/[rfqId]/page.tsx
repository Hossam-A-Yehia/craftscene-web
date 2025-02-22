import DiscussionPage from "@/components/pages/Discussion/DiscussionPage";
import { discussion } from "@/config/metadata";
import React from "react";
export const metadata = discussion;
export default async function Page({
  params,
}: {
  params: Promise<{ rfqId: string }>;
}) {
  const rfqId = (await params).rfqId;
  return <DiscussionPage rfqId={rfqId} />;
}
