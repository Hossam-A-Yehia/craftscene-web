import AddBranchPage from "@/components/pages/AddBranchPage/AddBranchPage";
import { addBranch } from "@/config/metadata";
import React from "react";
export const metadata = addBranch;
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  return <AddBranchPage userId={userId} />;
}
