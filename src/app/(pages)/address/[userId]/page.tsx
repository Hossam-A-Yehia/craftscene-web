import AddressPage from "@/components/pages/AddressPage/AddressPage";
import { address } from "@/config/metadata";
import React from "react";
export const metadata = address;
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <AddressPage userId={userId} />;
}
