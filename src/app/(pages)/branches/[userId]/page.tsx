import BranchesPage from "@/components/pages/BranchesPage/BranchesPage";
import { branches } from "@/config/metadata";
import React from "react";
export const metadata = branches;
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <BranchesPage userId={userId} />;
}
