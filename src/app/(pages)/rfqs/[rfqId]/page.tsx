import RFQPage from "@/components/pages/RFQ/RFQPage";
import { RFQ } from "@/config/metadata";
import React from "react";
export const metadata = RFQ;
export default async function Page({
  params,
}: {
  params: Promise<{ rfqId: string }>;
}) {
  const rfqId = (await params).rfqId;
  return <RFQPage rfqId={rfqId} />;
}
