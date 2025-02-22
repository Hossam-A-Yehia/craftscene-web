import OrderPage from "@/components/pages/Order/OrderPage";
import { order } from "@/config/metadata";
import React from "react";
export const metadata = order;
export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const orderId = (await params).orderId;
  return <OrderPage orderId={orderId} />;
}
