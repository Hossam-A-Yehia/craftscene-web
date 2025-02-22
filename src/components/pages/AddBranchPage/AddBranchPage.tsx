import AddBranchTemplate from "@/components/templates/AddBranch/AddBranchTemplate";
import React from "react";

export default async function AddBranchPage({ userId }: { userId: string }) {
  return <AddBranchTemplate userId={userId} />;
}
