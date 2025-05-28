import SubscriptionPage from "@/components/pages/SubscriptionPage/SubscriptionPage";
import { packages } from "@/config/metadata";
import React from "react";
export const metadata = packages;
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <SubscriptionPage userId={userId} />;
}
