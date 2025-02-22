import BranchesTemplate from "@/components/templates/Branches/BranchesTemplate";
import React from "react";

export default async function BranchesPage({ userId }: { userId: string }) {
  return <BranchesTemplate userId={userId} />;
}
