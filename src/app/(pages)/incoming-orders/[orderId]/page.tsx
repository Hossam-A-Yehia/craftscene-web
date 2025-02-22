import IncomingOrderPage from "@/components/pages/IncomingOrder/IncomingOrderPage";
import { order } from "@/config/metadata";
import React from "react";
export const metadata = order;
export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const orderId = (await params).orderId;
  return <IncomingOrderPage orderId={orderId} />;
}
