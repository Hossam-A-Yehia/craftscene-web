import RFQTemplate from "@/components/templates/RFQ/RFQTemplate";
import React from "react";

export default async function RFQPage({ rfqId }: { rfqId: string }) {
  return <RFQTemplate rfqId={rfqId} />;
}
