import AddAddressPage from "@/components/pages/AddAddressPage/AddAddressPage";
import { address } from "@/config/metadata";
import React from "react";
export const metadata = address;
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <AddAddressPage userId={userId} />;
}
