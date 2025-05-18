import PackagesPage from "@/components/pages/Packages/PackagesPage";
import { packages } from "@/config/metadata";
import React from "react";
export const metadata = packages;
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <PackagesPage userId={userId} />;
}
