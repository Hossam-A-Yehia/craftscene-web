import QuotationPage from "@/components/pages/QuotationPage/QuotationPage";
import { quotation } from "@/config/metadata";
import React from "react";
export const metadata = quotation;
export default async function Page({
  params,
}: {
  params: Promise<{ quotationId: string }>;
}) {
  const quotationId = (await params).quotationId;
  return <QuotationPage quotationId={quotationId} />;
}
