import CheckoutPage from "@/components/pages/Checkout/CheckoutPage";
import { checkout } from "@/config/metadata";
import React from "react";
export const metadata = checkout;
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <CheckoutPage userId={userId} />;
}
