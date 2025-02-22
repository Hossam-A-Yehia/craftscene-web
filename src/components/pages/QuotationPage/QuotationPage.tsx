import QuotationTemplate from "@/components/templates/Quotation/QuotationTemplate";
import React from "react";

export default async function QuotationPage({
  quotationId,
}: {
  quotationId: string;
}) {
  return <QuotationTemplate quotationId={quotationId} />;
}
