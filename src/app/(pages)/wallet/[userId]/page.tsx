import WalletPage from "@/components/pages/WalletPage/WalletPage";
import { wallet } from "@/config/metadata";
import React from "react";
export const metadata = wallet;
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <WalletPage userId={userId} />;
}
